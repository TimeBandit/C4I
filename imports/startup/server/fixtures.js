/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';
import { Charities } from '../../api/server/charities';
// import { charComm } from '../../api/server/charityAPI';
const ccAPI = require('charity-commission-api');
const args = { APIKey: '755dfeae-434d-4c90-a', strSearch: 'islam' };

Meteor.startup(function() {

    // init the db here
    if (Charities.find().count() === 0) {
        
        console.log('Charities is empty :)');

        // run the api funtion and store the result in a collection
        ccAPI.GetCharitiesByKeyword(args).then(function(result) {
            _.each(result.GetCharitiesByKeywordResult.Charities, function(value, key, list) {
                let newVal = value;
                // newVal._id = newVal.RegisteredCharityNumber;
                console.log(newVal);
                Charities.insert(newVal, (err, id) => {
                    if (err) {
                        console.log(`something went wrong: ${err}`);
                    }
                });
            });
            // console.log(Charities.find().fetch());
        }).catch(function(err) {
            console.log(`Call to ${err.operationName} failed with error: ${err.err}`);
        });
    }
});
