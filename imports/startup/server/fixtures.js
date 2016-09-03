/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Charities } from '../../api/server/charities';
// 
const ccAPI = require('charity-commission-api');
const search_terms = Meteor.settings.private.search_terms;
const api_key = Meteor.settings.private.charity_commission.api_key;
const temp = search_terms[0];
const argi = { APIKey: api_key, strSearch: temp};
// const args = { APIKey, temp };
// ..
function filterResults(results) {
    return _.where(results, { "RegistrationStatus": "Registered" });
}

function writeToDb(value) {
    console.log(value.RegisteredCharityNumber);
    Charities.insert(value, (err, id) => {
        if (err) {
            Meteor.error(err, `Something went wrong, writing to the db`);
        }
    });
}

Meteor.startup(function() {
    // init the db here
    if (Charities.find().count() === 0) {
        console.log('Charities is empty :)');

        // run the api funtion and store the result in a collection
        ccAPI.GetCharitiesByKeyword(argi).then(function(value) {
            console.log(value);
            let results = value.GetCharitiesByKeywordResult.CharityList;
            results = filterResults(results);
            _.each(results, function(value, key, list) {
                console.log(key);
                writeToDb(value);
            });
        }).catch(function(err) {
            Meteor.error(err, `Something went wrong creating the client`);
        });
    }
});


/*
on startup
    db is empty?
        take first seach term
            query for charitiesby keyword
            upsert results into db (select on charity id)
        get next keyword and repeat
        calculate homepage data
            take each charity id in charity list
                use GetCharityAnnualReturns to fetch data
                extract key data (totalFunds, employees, volunteers, 
                    charitableActivities totalIncomingResources)
                store key data
                calculate efficiency
                store
            take next charity id & repeat
end startup

on cron activation
    take first seach term
        query for charitiesby keyword
            take first result
                check registration status
                    if 'remove'

        upsert results into db (select on charity id)

            Two cases 
                1. the doc exists then update the values the values, store the id
                db.chairy.update(
                    {RegisteredCharityNumber: x},
                    {$set: }
                )
                2. the doc doesnt exist an 
        update updatedAt
    get next keyword and repeat
    calculate homepage data
        take each charity id in charity list
            use GetCharityAnnualReturns to fetch data
            extract key data (totalFunds, employees, volunteers, 
                charitableActivities totalIncomingResources)
            store key data
            calculate efficiency
            store
        take next charity id & repeat
*/
