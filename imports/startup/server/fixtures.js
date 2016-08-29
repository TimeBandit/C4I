/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';
import { CharityList } from '../../api/server/charitylist';
// import { charComm } from '../../api/server/charityAPI';

Meteor.startup(function() {
    // init the db here
    if (CharityList.find().count() === 0) {
        console.log('CharityList is empty :)');

        let args = { APIKey: '755dfeae-434d-4c90-a', strSearch: 'islam' };
        
        // run the api funtion and store the result in a collection
        const ccAPI = require('charity-commission-api');

        ccAPI.GetCharitiesByKeyword(args).then(function(result) {

            console.log(result);

        }).catch(function(err) {

            console.log(`Call to ${err.operationName} failed with error: ${err.err}`);

        });
    }
});
