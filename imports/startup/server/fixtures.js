/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Charities } from '../../api/server/charities';
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
        ccAPI.createClient(ccAPIUrl)
            .then(GetCharitiesByKeywordList) // returns list of charity numbers & client
            .then(buildCharNumList) // return list of charity object
            .then(fetchAllCharities)
            .catch(function(error) {
                throw error;
            });
    }
});
