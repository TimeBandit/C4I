/*jshint esversion: 6 */
// 8 charities of 82 had returns data
// 75 charities of 82 had submissions data

import { Meteor } from 'meteor/meteor';
import { Charities, RegistrationHistorySchema, AddressSchema, TrusteesSchema } from '../../api/server/charities.js';
import { GetCharitiesByKeywordList, buildCharNumList, fetchAllCharities, makeData } from '../../api/server/core';
// 
const searchTerms = Meteor.settings.private.search_terms;
const settings = Meteor.settings;
const ccAPI = require('charity-commission-api');
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
const APIKey = settings.private.charity_commission.api_key;
// 
Meteor.startup(function() {
    // init the db here
    console.log(`Meteor started`);
    console.log(Charities.find().count());
    if (Charities.find().count() === 0) {
        console.log('dbs is empty');
        ccAPI.createClient(ccAPIUrl)
            .then(function(client) {
                console.log('searching for charitites');
                return GetCharitiesByKeywordList(client, { APIKey }, ["madrassa"]);
            })
            .then(function(obj) {
                console.log('fetching all charities');
                const { client, res } = obj;
                return fetchAllCharities(client, { APIKey }, res);
            })
            .then(function(val) {
                console.log(`parse returned data with makeData()`);
                return makeData(val);
            })
            .then(function(val) {
                console.log(`writing objects to db`);
                console.log(val[0].RegisteredCharityNumber);

                Charities.insert(val[0]);

                val.forEach(function(element, index) {
                    console.log(element.RegisteredCharityNumber);
                    // Charities.update({
                    //         RegisteredCharityNumber: element.RegisteredCharityNumber
                    //     },
                    //     el, { upsert: true },
                    //     function(err, docs) {
                    //         if (err) {
                    //             throw new Error(`${err.reason}`);
                    //         } else {
                    //             console.log(`wrote ${el.RegisteredCharityNumber} to db`);
                    //         }
                    //     });
                });
            })
            .catch(function(error) {
                throw error;
            });
    }
});
