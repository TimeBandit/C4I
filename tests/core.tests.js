/*jshint esversion: 6 */

// const chai = require("chai");
// const chaiAsPromised = require("chai-as-promised");
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import { GetCharitiesByOneKeyword, GetCharitiesByKeywordList } from '../imports/api/server/core';
import { testData } from './testData';
chai.use(chaiAsPromised.default);
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
        function step1() {
            return new Promise(function(resolve, reject) {
                resolve([true]);
            });
        }

        function step2(val) {
            return new Promise(function(resolve, reject) {
                if (val) { resovle(val.push(true)); }
            });
        }

        function step3(val) {
            return new Promise(function(resolve, reject) {
                if (val) { resovle(val.push(true)); }
            });
        }
        it('returns eventually return [true, true, true]', function() {
            step1()
                .then(step2)
                .then(step3)
                .then(function(res) {
                    return res.should.eventually.equal([true, true, true]);
                });
            assert.equal(true, true);
        });

    });

    describe('createClient()', function() {
        it('should should create a client', function() {
            return ccAPI.createClient(ccAPIUrl).should.be.fulfilled;
        });
        it('should return error when no API url given', function() {
            const ccAPIUrl = '';
            return ccAPI.createClient(ccAPIUrl).should.be.rejected;
        });
    });

    describe('GetCharitiesByOneKeyword()', function() {
        const goodArgs = { APIKey, strSearch: 'madrassa' };

        it('should eventually be fullfilled', function() {
            ccAPI.createClient(ccAPIUrl).then(function(client) {
                return GetCharitiesByOneKeyword(client, goodArgs).should.be.fulfilled;
            });
        });
        it('it shoud return an array', function(done) {
            ccAPI.createClient(ccAPIUrl).then(function(client) {
            	return expect(GetCharitiesByOneKeyword(client, goodArgs)).to.eventually.be.instanceof(Array).notify(done);
            });
        });
        // it('expect the first element to be a client', function() {
        //     return ccAPI.createClient(ccAPIUrl)
        //         .then(function(client) {
        //             GetCharitiesByOneKeyword(client, goodArgs)
        //                 .then(function(val) {
        //                     // console.log(val);
        //                     val.should.have.property("wsdl");
        //                     // return expect(val[0]).to.have.deep.property("wsdl.uri", ccAPIUrl);
        //                 });
        //         });
        // });
        it('expect the the second element to have a required keys', function(done) {
            const allKeys = [
                'RegisteredCharityNumber',
                'SubsidiaryNumber',
                'CharityName',
                'MainCharityName',
                'RegistrationStatus',
                'PublicEmailAddress',
                'MainPhoneNumber'
            ];
            ccAPI.createClient(ccAPIUrl).then(function(client) {
            	return expect(GetCharitiesByOneKeyword(client, goodArgs)).to.have.all.keys.apply(this, allKeys).notify(done);
                // GetCharitiesByOneKeyword(client, goodArgs)
                //     .then(function(val) {
                //     	console.log(val[0]);
                //         return expect(val[0]).to.have.all.keys.apply(this, allKeys);
                //     }).catch(function(err) {
                //         console.log(err);
                //     });
            });
        });
    });

    describe('GetCharitiesByKeywordList()', function() {
        // const goodArgs = { APIKey: "755dfeae-434d-4c90-a", strSearch: 'madrassa' };

        // it('should eventually be fullfilled', function() {
        //     ccAPI.createClient(ccAPIUrl).then(function(client) {
        //         return GetCharitiesByKeywordList(client, [], goodArgs).should.be.fulfilled;
        //     });
        // });
        // it('should return error when empt list passed', function() {
        //     ccAPI.createClient(ccAPIUrl).then(function(client) {
        //         return GetCharitiesByKeywordList(client, [], goodArgs).should.be.rejected;
        //     });
        // });
        // it('should return a list of lists', function() {
        //     ccAPI.createClient(ccAPIUrl).then(function(client) {
        //         return GetCharitiesByKeywordList(client, ["madrassa"], goodArgs).should.be.rejected;
        //     }).catch(function(err) {
        //         console.log(err);
        //     });
        // });
    });
});

// creatClient() //return client & search array
//   .then(searchForCharities) // returns list of charity numbers & client
//   .then(fetchCharities) // return list of charity object
//   .then(storeCharities)
//    .catch(function(error){
//     throw error
// })
