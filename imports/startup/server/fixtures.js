/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Charities, RegistrationHistorySchema, AddressSchema, TrusteesSchema } from '../../api/server/charities';
import { GetCharitiesByKeywordList, buildCharNumList, fetchAllCharities } from '../../api/server/core';
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
    if (Charities.find().count() === 0) {
        console.log('dbs is empty');
        ccAPI.createClient(ccAPIUrl)
            .then(function(client) {
                console.log('searching for charitites');
                return GetCharitiesByKeywordList(client, { APIKey }, ["madrassa"]);
            })
            .then(function(obj) {
                console.log('****', val);
                console.log('fetching all charities');
                const { client, res } = obj;
                return fetchAllCharities(client, { APIKey }, res);
            })
            .then(function(val) {
                return makeData(val);                
                // 8 charities of 82 had returns data
                // 75 charities of 82 had submissions data
            })
            .then(function (val) {
                val.forEach(function (el, idx, arr) {
                    console.log(el);
                });
            })
            .catch(function(error) {
                throw error;
            });
    }
});
