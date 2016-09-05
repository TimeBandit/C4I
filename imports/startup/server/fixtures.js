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
    console.log(charity.CharityName);
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
                    resolve(numAffected);
                }
            }
        );
    });
}

function storeCharityExtraData(charity) {
    // console.log(charity);
}

Meteor.startup(function() {
    // init the db here
    if (Charities.find().count() === 0) {
        console.log('Charities is empty :)');
        searchTerms.reduce(function(sequence, term) {
            console.log(term);
            return sequence.then(function() {
                return ccAPI.GetCharitiesByKeyword({ APIKey: api_key, strSearch: term });
            }).then(function(charitiesArray) {
                console.log(charitiesArray.GetCharitiesByKeywordResult.CharityList.length);
                charitiesArray.GetCharitiesByKeywordResult.CharityList.reduce(function(sequence, charity) {
                    return sequence.then(function() {
                        return storeCharityBasicData(charity);
                    }).then(function() {
                        return ccAPI.GetCharityByRegisteredCharityNumber({ APIKey: api_key, strSearch: charity.RegisteredCharityNumber });
                    }).then(function(result) {
                        return storeCharityExtraData(result);
                    });
                }, Promise.resolve());
            });
        }, Promise.resolve()).catch(function(err) {
            Meteor.error(err, `Something went wrong creating the client`);
        });
    }
});