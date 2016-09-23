/*jshint esversion: 6 */
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { chai, assert, should, expect } from 'chai';
// 
import { Charities } from '../../api/server/charities';
const ccAPI = require('charity-commission-api');
const searchTerms = Meteor.settings.private.search_terms;
const api_key = Meteor.settings.private.charity_commission.api_key;

// creatClient() //return client & search array
//   .then(searchForCharities) // returns list of charity numbers & client
//   .then(fetchCharities) // return list of charity object
//   .then(storeCharities)
//	 .catch(function(error){
//		throw error
// })

/* createClient() */
// create client returns a Promise
assert.typeOf(ccAPI.createClient(), 'Promise', 'Promise returned by createClient()');

/* fetchCharites*/
function searchForCharities(client, api_key, searchTerms) {
	if (searchTerms.length === 0) throw {name:'argument error', message:''};
}

// throw error when empty search term array given
// throw and error is search terms is not an array
// return error if invalid client passed
// return error if query returns error
// return a 
