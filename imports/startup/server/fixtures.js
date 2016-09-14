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
function sleep(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            // process.stdout.write(".");
            resolve(true);
        }, time);
    });
}
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

// todo: create tests for this
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
    console.log(`charitiesArray is of length ${arr.length}`);
    
    let res = _.map(arr, function(value, key, list) {
        // console.log(value.RegisteredCharityNumber);
        return value.RegisteredCharityNumber;
    });
    count = count + res.length;
    charityNums.add(res);
}
/*============================================================================*/
// function fetchCharity() {
//     console.log(charityNums.get().length);
//     charityNums.get().reduce(function(sequence, charNum) {
//         return sequence.then(function() {
//             console.log(count--);
//             return ccAPI.GetCharityByRegisteredCharityNumber({ APIKey: api_key, registeredCharityNumber: charNum });
//         }).then(function(res) {
//             // console.log(`${count--}- ${res.GetCharityByRegisteredCharityNumberResult.CharityName}`);
//         });
//     }, Promise.resolve());
// }
// 
// Meteor.startup(function() {
//     // init the db here
//     console.log(`Meteor started`);
//     if (Charities.find().count() === 0) {
//         console.log('Charities is empty :)');
//         searchTerms.reduce(function(sequence, term) {
//             /// sequence for each search term
//             return sequence.then(function() {
//                 return ccAPI.GetCharitiesByKeyword({ APIKey: api_key, strSearch: term });})
//                 .then(buildCharNumList);
//         }, Promise.resolve())
//         .then(fetchCharity)
//         .then(()=> {console.log(`Data Fetched.. Yay!`);})
//         .catch(function(err) {
//             Meteor.error(err, `Something went wrong creating the client`);
//         });
//     }
// });
// 
// code that uses create client
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
// 
function fetchCharity(client) {

    console.log(`blabla `,charityNums.get().length);
    charityNums.get().reduce(function(sequence, charNum) {
        return sequence.then(function() {
            console.log(count--);
            return sleep(1)
                .then(function(argument) {
                    return new Promise(function(resolve, reject) {
                        client.GetCharityByRegisteredCharityNumber({ APIKey: api_key, strSearch: term }, function(err, result) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    });
                });
        }).then(function(res) {
            // console.log(`${count--}- ${res.GetCharityByRegisteredCharityNumberResult.CharityName}`);
        });
    }, Promise.resolve());
}
// function fetchCharity(client) {
//     console.log(`fetchCharity`);
// }
// 
Meteor.startup(function() {
    // init the db here
    console.log(`Meteor started`);
    if (Charities.find().count() === 0) {
        console.log('Charities is empty :)');
        ccAPI.createClient(ccAPIUrl)
            .then(function(client) {
                return Promise.resolve(client)
                    .then(function(client) {
                        // console.log(_.keys(client));
                        return searchTerms.reduce(function(sequence, term) {
                                /// sequence for each search term
                                return sequence.then(function() {
                                    return new Promise(function(resolve, reject) {
                                            client.GetCharitiesByKeyword({ APIKey: api_key, strSearch: term }, function(err, result) {
                                                if (err) {
                                                    reject(err);
                                                } else {
                                                    resolve(result);
                                                }
                                            });
                                        })
                                        .then(function(val) {
                                            buildCharNumList(val);
                                        });
                                });
                            }, Promise.resolve());
                            
                    })
                    .then(fetchCharity(client));
            })
            .then(() => { console.log(`Data Fetched.. Yay!`); })
            .catch(function(err) {
                Meteor.error(err, `Something went wrong creating the client`);
            });
    }
});

// var promise = firstQuery.get(objectId)
//     .then(function(result1) {
//         return secondQuery.find();
//     }).then(function(result2) {
//         return thirdQuery.find();
//     }).then(function(result3) {

//         // here I want to use "result1", "result2" and "result3"
//     });

// var promise = firstQuery.get(objectId)
//     .then(function(result1) {
//         return secondQuery.find()
//             .then(function(result2) {
//                 return thirdQuery.find()
//                     .then(function(result3) {
//                         //can use result1, result2, result3 here
//                     });
//             });
//     });
