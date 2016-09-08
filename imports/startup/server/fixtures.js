/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Charities } from '../../api/server/charities';
// 
const ccAPI = require('charity-commission-api');
const searchTerms = Meteor.settings.private.search_terms;
const api_key = Meteor.settings.private.charity_commission.api_key;
//
function filterResults(results) {
    return _.where(results, { "RegistrationStatus": "Registered" });
}

function storeCharityBasicData(charity) {
    // todo change only to update if upDatedAt is not the same date
    return new Promise(function(resolve, reject) {
        Charities.update({ RegisteredCharityNumber: charity.RegisteredCharityNumber }, {
                $set: {
                    SubsidiaryNumber: charity.SubsidiaryNumber,
                    CharityName: charity.CharityName,
                    MainCharityName: charity.MainCharityName,
                    RegistrationStatus: charity.RegistrationStatus,
                    PublicEmailAddress: charity.PublicEmailAddress,
                    MainPhoneNumber: charity.MainPhoneNumber,
                    updatedAt: new Date()
                }
            }, { upsert: true },
            (err, numAffected) => {
                if (err) {
                    reject(err);
                } else {
                    // console.log(`𖣳 - ${charity.CharityName}`);
                    resolve(numAffected);
                }
            }
        );
    });
}
let count = 0;

function storeCharityExtraData(value) {
    --count;
    console.log(`${count} objects left`);
    if (value.GetCharityAnnualReturnsResult !== null) {


        // total funds
        var AnnualReturns = value
            .GetCharityAnnualReturnsResult
            .AnnualReturns[0];

        var totalFunds = AnnualReturns
            .AssetsAndLiabilities
            .Funds
            .TotalFunds;

        // efficiency
        var charitableActivities = AnnualReturns.Resources.Expended.CharitableActivities;
        var totalIncomingResources = AnnualReturns.Resources.Incoming.Total;
        var efficiency = charitableActivities / totalIncomingResources;

        var numEmployees = AnnualReturns.Employees.NoEmployees;
        var numVolunteers = AnnualReturns.Employees.NoVolunteers;

        // console.log({
        //     totalFunds,
        //     efficiency,
        //     numVolunteers,
        //     numEmployees
        // });

    }
}

// Meteor.startup(function() {
//     // init the db here
//     console.log(`Meteor started`);
//     if (Charities.find().count() === 0) {
//         console.log('Charities is empty :)');
//         searchTerms.reduce(function(sequence, term) {
//             console.log(term);
//             return sequence.then(function() {
//                 return ccAPI.GetCharitiesByKeyword({ APIKey: api_key, strSearch: term });
//             }).then(function(charitiesArray) {
//                 console.log(charitiesArray.GetCharitiesByKeywordResult.CharityList.length);
//                 count = count + charitiesArray.GetCharitiesByKeywordResult.CharityList.length;
//                 charitiesArray.GetCharitiesByKeywordResult.CharityList.reduce(function(sequence, charity) {
//                     return sequence.then(function() {
//                         return storeCharityBasicData(charity);
//                     }).then(function() {
//                         // setTimeout(function() { console.log(`𖢾 ...${charity.RegisteredCharityNumber}`) }, 10);
//                         setTimeout(() => {}, 10);
//                         return ccAPI.GetCharityAnnualReturns({ APIKey: api_key, registeredCharityNumber: charity.RegisteredCharityNumber });
//                     }).then(function(result) {
//                         return storeCharityExtraData(result);
//                     });
//                 }, Promise.resolve()).catch(function(err) {
//                     Meteor.error(err, `Something went wrong creating the client`);
//                 });
//             });
//         }, Promise.resolve(function() {
//             console.log(`Done Fetching Data`);
//         })).catch(function(err) {
//             Meteor.error(err, `Something went wrong creating the client`);
//         });
//     }
// });

// todo: crate tests for this
let charityNums = {
    list: [],
    add: function(listToAdd) {
        let self = this;
        listToAdd.forEach(function(el, idx, array) {
            self.list.push(el);
        });
        return _.uniq(self.list);
    },
    get: function() {
        let self = this;
        return _.uniq(self.list);
    }
};

Meteor.startup(function() {
    // init the db here
    console.log(`Meteor started`);
    if (Charities.find().count() === 0) {
        console.log('Charities is empty :)');
        searchTerms.reduce(function(sequence, term) {
            console.log(term);
            return sequence.then(function() {
                return ccAPI.GetCharitiesByKeyword({ APIKey: api_key, strSearch: term });
            }).then(function(charitiesArray) {
                // build the charities numbers list
                let arr = charitiesArray.GetCharitiesByKeywordResult.CharityList;
                let res = _.map(arr, function(value, key, list) {
                    return value.RegisteredCharityNumber;
                });
                console.log(res.length);
                console.log(`****`);
                charityNums.add(res);
            });
        }, Promise.resolve()
        ).then(function(arr) {
            console.log(charityNums.get().length);
            charityNums.get().reduce(function (sequence, charNum) {
                return sequence.then(function () {
                    // console.log(charNum);
                    return ccAPI.GetCharityByRegisteredCharityNumber({ APIKey: api_key, registeredCharityNumber: charNum });
                }).then(function (res) {
                    // console.log(res.GetCharityByRegisteredCharityNumberResult.CharityName);
                });
            }, Promise.resolve());
        }).catch(function(err) {
            Meteor.error(err, `Something went wrong creating the client`);
        });
    }
});
