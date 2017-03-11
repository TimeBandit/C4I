/*jshint esversion: 6 */
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Charities, RegistrationHistorySchema, AddressSchema, TrusteesSchema } from '../../api/charities/charities.js';
import { GetCharitiesByKeywordList, buildCharNumList, fetchAllCharities, sleep, getCharityByRegisteredCharityNumber} from '../../api/charities/server/core';
// 
const searchTerms = Meteor.settings.private.search_terms;
const settings = Meteor.settings;
const ccAPI = require('charity-commission-api');
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
const APIKey = settings.private.charity_commission.api_key;
// 
import { Mongo } from 'meteor/mongo';
// 
const Tasks = new Mongo.Collection('tasks');
Tasks.insert({ text: "1", createdAt: new Date() });
// Tasks.insert({ text: "2", createdAt: new Date() });
// Tasks.insert({ text: "3", createdAt: new Date() });
// Tasks.insert({ text: "4", createdAt: new Date() });
// Charities.insert({ text: "5", createdAt: new Date() });
// 

Meteor.startup(function() {

  // init the db here...
  console.log(`Meteor started`);
  console.log(Charities.find().count());

  if (Charities.find().count() < 50) {
    function scrapeCommission() {
      ccAPI.createClient(ccAPIUrl)
        .then(function(client) {
          // store the client on the function    
          scrapeCommission.client = client;
          // return a list of unique charity numbers
          return GetCharitiesByKeywordList(scrapeCommission.client, { APIKey }, searchTerms);
          //  
        }).then(function(charityIds) {
          console.log(charityIds.res.length);
          // build a sequence chain
          charityIds.res.reduce(function(sequence, charityId, idx) {
            return sequence.then(function() {
              console.log(`Charity #: ${idx+1}`);
              return sleep(1000);
            }).then(function() {
              // fetch a single charity
              return getCharityByRegisteredCharityNumber(scrapeCommission.client, { APIKey, registeredCharityNumber: charityId })
            }).then(function(result) {
              // extract the important fields
              // parseData(result);
              return result.GetCharityByRegisteredCharityNumberResult;
            }).then(function(result) {
              // write a charity object to the db
              Charities.rawCollection().update({ RegisteredCharityNumber: result.RegisteredCharityNumber },
                result, { upsert: true }
              );
            }).catch(function(err) {
              console.log(err);
            })
          }, Promise.resolve()).then(function() {
            console.log("DONE!!")
          })

        })
    }
    scrapeCommission();
  }
});