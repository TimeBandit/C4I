/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Charities } from '../../api/server/charities';
// 
const ccAPI = require('charity-commission-api');
const searchTerms = Meteor.settings.private.search_terms;
const api_key = Meteor.settings.private.charity_commission.api_key;
const argi = { APIKey: api_key, strSearch: searchTerms[0] };
//.
function filterResults(results) {
    return _.where(results, { "RegistrationStatus": "Registered" });
}

/* upsert charities to Charities db */
function writeToDb(value) {
    console.log(value.MainCharityName);

    if (Charities.find({ RegisteredCharityNumber: value.RegisteredCharityNumber }).count() > 0) {
        console.log(`${value.CharityName} found`);
    }

    Charities.update({ RegisteredCharityNumber: value.RegisteredCharityNumber }, {
            $set: {
                SubsidiaryNumber: value.SubsidiaryNumber,
                CharityName: value.CharityName,
                MainCharityName: value.MainCharityName,
                RegistrationStatus: value.RegistrationStatus,
                PublicEmailAddress: value.PublicEmailAddress,
                MainPhoneNumber: value.MainPhoneNumber,
                updatedAt: new Date()
            }
        }, { upsert: true },
        (err, numAffected) => {
            if (err) {
                Meteor.error(err, `Something went wrong, writing to the db`);
            } else {
                // console.log(`#affected: ${numAffected}`);
                // 
            }
        }
    );
}

Meteor.startup(function() {
    // init the db here
    if (Charities.find().count() === 0) {
        console.log('Charities is empty :)');

        // run the api funtion and store the result in a collection
        ccAPI.GetCharitiesByKeyword(argi).then(function(value) {
            let results = value.GetCharitiesByKeywordResult.CharityList;
            results = filterResults(results);
            console.log(`${results.length} registered charities`);
            _.each(results, function(value, key, list) {
                // console.log( `***`, value, `***`);
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
