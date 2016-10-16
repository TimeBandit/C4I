/*jshint esversion: 6 */
const test = {
    CharityName: 'test'
};
// 8 charities of 82 had returns data
// 75 charities of 82 had submissions data

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Charities, RegistrationHistorySchema, AddressSchema, TrusteesSchema } from '../../api/server/charities.js';
import { GetCharitiesByKeywordList, buildCharNumList, fetchAllCharities, makeData } from '../../api/server/core';
// 
const searchTerms = Meteor.settings.private.search_terms;
const settings = Meteor.settings;
const ccAPI = require('charity-commission-api');
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
const APIKey = settings.private.charity_commission.api_key;
// 
import { Mongo } from 'meteor/mongo';
const Tasks = new Mongo.Collection('tasks');
Tasks.insert({ text: "1", createdAt: new Date() });
// Tasks.insert({ text: "2", createdAt: new Date() });
// Tasks.insert({ text: "3", createdAt: new Date() });
// Tasks.insert({ text: "4", createdAt: new Date() });
// Charities.insert({ text: "5", createdAt: new Date() });
// 
function dbWrite(obj) {

    return new Promise(function(resolve, reject) {
        Charities.insert(obj, function(err, id) {
            if (err) {
                reject(err);
            } else {
                resolve(id);
            }
        });
    });
}

let output;

function writeIt() {
    console.log(`ok lets do this!`);
    output.forEach(function(el, idx, arr) {
        Charities.insert(el);
    });
}
Meteor.startup(function() {
    // init the db here...
    console.log(`Meteor started`);
    console.log(Charities.find().count());
    //     console.log(err ? console.log(err) : console.log(res));
    // });
    if (Charities.find().count() === 0) {
        console.log('dbs is empty');
        ccAPI.createClient(ccAPIUrl)
            .then(function(client) {
                // Charities.insert(test);
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
                console.log(val[0]);
                val.forEach(function(el, idx, arr) {
                    // Charities.insert(el);
                    console.log(el.RegisteredCharityNumber);
                    Charities.rawCollection().update({ RegisteredCharityNumber: el.RegisteredCharityNumber },
                        el, { upsert: true }
                    );
                });
                console.log(`DONE!`);

            })
            .catch(function(error) {
                console.log(error);
                Meteor.error(error);
                // throw error;
            });
    }
});