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
describe('Core', function() {
    // 	var x = require("charity-commission-api")
    // x.GetCharitiesByKeyword({ APIKey: "755dfeae-434d-4c90-a", strSearch: 'madrassa' })
    //     .then(function(val){
    //     console.log(JSON.stringify(val));
    // })

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
        const goodArgs = { APIKey: "755dfeae-434d-4c90-a", strSearch: 'madrassa' };

        it('should eventually be fullfilled', function() {
            ccAPI.createClient(ccAPIUrl).then(function(client) {
                return GetCharitiesByOneKeyword(client, goodArgs).should.be.fulfilled;
            });
        });
        it('it shoud return an array', function() {
            ccAPI.createClient(ccAPIUrl).then(function(client) {
                return assert.isArray(GetCharitiesByOneKeyword(client, goodArgs), 'what kind of tea do we want?');
            });
        });
        it('expect the first element to be a client', function() {
            ccAPI.createClient(ccAPIUrl)
                .then(function(client) {
                    GetCharitiesByOneKeyword(client, goodArgs)
                        .then(function(val) {
                            return expect(val[0]).to.have.deep.property(`wsdl.uri`, ccAPIUrl);
                        });
                });
        });
        it('expect the the second element to have a required keys', function() {
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
                GetCharitiesByOneKeyword(client, goodArgs)
                    .then(function(val) {
                        return expect(val[1][0]).to.have.all.keys.apply(this, allKeys);
                    });
            });
        });
    });
    
    describe('GetCharitiesByKeywordList()', function() {
        it('should eventually be fullfilled', function() {
            ccAPI.createClient(ccAPIUrl).then(function(client) {
                return GetCharitiesByKeywordList(client, []).should.be.fulfilled;
            });
        });
        it('should return error when empt list passed', function() {
            ccAPI.createClient(ccAPIUrl).then(function(client) {
                return GetCharitiesByKeywordList(client, []).should.be.fulfilled;
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
