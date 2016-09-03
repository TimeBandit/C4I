/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Charities } from '../../api/server/charities';
// 
const ccAPI = require('charity-commission-api');
const search_terms = Meteor.settings.private.search_terms;
const api_key = Meteor.settings.private.charity_commission.api_key;
const argi = { APIKey: api_key, strSearch: search_terms[0] };
//.
function filterResults(results) {
    return _.where(results, { "RegistrationStatus": "Registered" });
}

function writeToDb(value) {
    console.log(value.SubsidiaryNumber,
        value.CharityName,
        value.MainCharityName,
        value.RegistrationStatus,
        value.PublicEmailAddress,
        value.MainPhoneNumber);

    if (Charities.find({ RegisteredCharityNumber: value.RegisteredCharityNumber }).count() > 0) {
        console.log(`${value.CharityName} found`);
    }

    Charities.update({ RegisteredCharityNumber: value.RegisteredCharityNumber }, {
            $currentDate: {
                updatedAt: { $type: "date" }
            },
            $set: {
                SubsidiaryNumber: value.SubsidiaryNumber,
                CharityName: value.CharityName,
                MainCharityName: value.MainCharityName,
                RegistrationStatus: value.RegistrationStatus,
                PublicEmailAddress: value.PublicEmailAddress,
                MainPhoneNumber: value.MainPhoneNumber
            }
        }, { upsert: true },
        (err, numAffected) => {
            if (err) {
                Meteor.error(err, `Something went wrong, writing to the db`);
            } else { console.log(numAffected); }
        }
    );
}

Meteor.startup(function() {
    // init the db here
    if (Charities.find().count() === 0) {
        console.log('Charities is empty :)');


        var temp = {
            RegisteredCharityNumber: 292948,
            SubsidiaryNumber: 0,
            CharityName: 'AL-HUDA CULTURAL CENTRE & MOSQUE',
            MainCharityName: 'AL-HUDA CULTURAL CENTRE & MOSQUE',
            RegistrationStatus: 'Registered',
            PublicEmailAddress: 'ALHUDACENTRE1@GMAIL.COM',
            MainPhoneNumber: '0207 780 9495'
        }

        // run the api funtion and store the result in a collection
        ccAPI.GetCharitiesByKeyword(argi).then(function(value) {
            let results = value.GetCharitiesByKeywordResult.CharityList;
            console.log(results.length);
            results = filterResults(results);
            console.log(results.length);
            Charities.insert(temp);
            _.each(results, function(value, key, list) {
                console.log(value, `***`);
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
