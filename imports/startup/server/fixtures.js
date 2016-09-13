/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Charities } from '../../api/server/charities';
// 
const ccAPI = require('charity-commission-api');
const searchTerms = Meteor.settings.private.search_terms;
const api_key = Meteor.settings.private.charity_commission.api_key;
const when = require('when');
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

function buildCharNumList(charitiesArray) {
    // build the charities numbers list
    let arr = charitiesArray.GetCharitiesByKeywordResult.CharityList;
    let res = _.map(arr, function(value, key, list) {
        return value.RegisteredCharityNumber;
    });
    console.log(res.length);
    console.log(`****`);
    count = count + res.length;
    charityNums.add(res);
}
/*============================================================================*/ 
function fetchCharity() {
    console.log(charityNums.get().length);
    charityNums.get().reduce(function(sequence, charNum) {
        return sequence.then(function() {
            console.log(count--);
            return ccAPI.GetCharityByRegisteredCharityNumber({ APIKey: api_key, registeredCharityNumber: charNum });
        }).then(function(res) {
            // console.log(`${count--}- ${res.GetCharityByRegisteredCharityNumberResult.CharityName}`);
        });
    }, Promise.resolve());
}
// 
Meteor.startup(function() {
    // init the db here
    console.log(`Meteor started`);
    if (Charities.find().count() === 0) {
        console.log('Charities is empty :)');
        searchTerms.reduce(function(sequence, term) {
            /// sequence for each search term
            return sequence.then(function() {
                return ccAPI.GetCharitiesByKeyword({ APIKey: api_key, strSearch: term });})
                .then(buildCharNumList);
        }, Promise.resolve())
        .then(fetchCharity)
        .then(()=> {console.log(`Data Fetched.. Yay!`);})
        .catch(function(err) {
            Meteor.error(err, `Something went wrong creating the client`);
        });
    }
});
/*============================================================================*/
// function fetchCharity() {
//     console.log(charityNums.get().length);
//     when.reduce(charityNums.get(), function(sequence, charNum) {
//         return sequence.then(function() {
//             console.log(count--);
//             return ccAPI.GetCharityByRegisteredCharityNumber({ APIKey: api_key, registeredCharityNumber: charNum });
//         }).then(function(res) {
//             // console.log(`${count--}- ${res.GetCharityByRegisteredCharityNumberResult.CharityName}`);
//         });
//     }, when.resolve());
// }
// // 
// Meteor.startup(function() {
//     // init the db here
//     console.log(`Meteor started`);
//     if (Charities.find().count() === 0) {
//         console.log('Charities is empty :)');
//         when.reduce(searchTerms, function(sequence, term) {
//             /// sequence for each search term
//             return sequence.then(function() {
//                 return ccAPI.GetCharitiesByKeyword({ APIKey: api_key, strSearch: term });})
//                 .then(buildCharNumList);
//         }, when.resolve())
//         .then(fetchCharity)
//         .then(()=> {console.log(`Data Fetched.. Yay!`);})
//         .catch(function(err) {
//             // Meteor.error(err, `Something went wrong creating the client`);
//             console.log(err);
//         });
//     }
// });