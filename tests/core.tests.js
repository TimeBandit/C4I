/*jshint esversion: 6 */
const chai = require("chai");
import * as sinon from 'sinon';
import { GetCharitiesByOneKeyword, GetCharitiesByKeywordList } from '../imports/api/server/core';
import { testData } from './testData';
// 
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
// 
const ccAPI = require('charity-commission-api');
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
const settings = require("../settings-development.json");
const APIKey = settings.private.charity_commission.api_key;

describe('Core', function() {
    describe('Test Promise pattern', function() {
        const step1 = function step1() {
            return new Promise(function(resolve, reject) {
                resolve([true]);
            });
        };

        const step2 = function step2(val) {
            return new Promise(function(resolve, reject) {
                resolve(val.concat(true));
            });
        };

        const step3 = function step3(val) {
            return new Promise(function(resolve, reject) {
                resolve(val.concat(true));
            });
        };
        it('returns eventually return [true, true, true]', function() {
            return step1()
                .then(step2)
                .then(step3)
                .then(function(res) {
                    expect(res).to.deep.equal([true, true, true]);
                });
        });
    });

    describe('createClient():', function() {
        it('should create a valid client', function() {
            return ccAPI.createClient(ccAPIUrl).then(function(client) {
                expect(client).to.respondTo('GetCharities');
            });
        });
    });

    describe('GetCharitiesByOneKeyword():', function() {
        const goodArgs = { APIKey, strSearch: 'madrassa' };

        it('it shoud return an array', function() {
            return ccAPI.createClient(ccAPIUrl)
                .then(function(client) {
                    return GetCharitiesByOneKeyword(client, goodArgs).then(function(val) {
                        expect(val).to.be.instanceof(Array);
                    });
                });
        });
        it('expect the first object to have all the required keys', function() {
            return ccAPI.createClient(ccAPIUrl).then(function(client) {
                return GetCharitiesByOneKeyword(client, goodArgs).then(function(val) {
                    expect(val[0]).to.have.all.keys([
                        'RegisteredCharityNumber',
                        'SubsidiaryNumber',
                        'CharityName',
                        'MainCharityName',
                        'RegistrationStatus',
                        'PublicEmailAddress',
                        'MainPhoneNumber'
                    ]);
                });
            });
        });
    });

    describe('GetCharitiesByKeywordList():', function() {
        const goodArgs = { APIKey, strSearch: 'madrassa' };
        let client;
        before(function() {
            return ccAPI.createClient(ccAPIUrl).then(function(val) {
                client = val;
            });
        });

        // it('should eventually be fullfilled', function() {
        //     return GetCharitiesByKeywordList(client, [], goodArgs).should.be.fulfilled;
        // });
        // it('should return error when list=[]', function() {
        //     return GetCharitiesByKeywordList(client, goodArgs, []).then(function(val) {
        //         expect(val).to.be.instanceof(Error);
        //     });
        // });
        it('should return a list of lists', function() {
            return GetCharitiesByKeywordList(client, goodArgs, ["madrassa"])
                .then(function(val) {
                    console.log(val);
                });
        });
    });
});

// creatClient() //return client & search array
//   .then(searchForCharities) // returns list of charity numbers & client
//   .then(fetchCharities) // return list of charity object
//   .then(storeCharities)
//    .catch(function(error){
//     throw error
// })
