/*jshint esversion: 6 */
const chai = require("chai");
import * as sinon from 'sinon';
import { GetCharitiesByOneKeyword, GetCharitiesByKeywordList, choose, buildCharNumList, sleep, charityDataset, charityGenerator, fetchAllCharities } from '../imports/api/server/core';
import { testData, listOfList, expected } from './testData';
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
    describe('choose():', function() {
        it('return a number that is at most 20', function() {
            expect(choose(20)).to.be.at.most(20);
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
        let client;
        const goodArgs = { APIKey, strSearch: 'madrassa' };

        before(function() {
            return ccAPI.createClient(ccAPIUrl).then(function(val) {
                client = val;
            });
        });
        it('should return error when list=[]', function() {
            expect(function() {
                return GetCharitiesByKeywordList(client, goodArgs, []);
            }).to.throw('Cannot have an empty list');
        });
        it('should return a list of lists', function() {
            return GetCharitiesByKeywordList(client, goodArgs, ["madrassa", "islamic relief"])
                .then(function(val) {
                    // console.log(val);
                    expect(val[0][0]).to.have.all.keys([
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
    describe('buildCharNumList():', function() {
        it('given correct dataset should build a list of unique charity numbers', function() {
            expect(buildCharNumList(listOfList)).to.deep.equal(expected);
        });
    });
    describe('fetchAllCharities()', function() {
        let client;
        const goodArgs = { APIKey };

        before(function() {
            return ccAPI.createClient(ccAPIUrl).then(function(val) {
                client = val;
            });
        });

        it('fetch a single charity', function() {
            return fetchAllCharities(client, { APIKey }, [1125833])
                .then(function(val) {
                    // console.log(val[0].GetCharityByRegisteredCharityNumberResult.CharityName);
                    expect(val[0].GetCharityByRegisteredCharityNumberResult.CharityName)
                        .to.equal("GREEN LANE MASJID AND COMMUNITY CENTRE");
                });
        });
        it('fetch two charities', function() {
            return fetchAllCharities(client, { APIKey }, [1102307, 1143183])
                .then(function(val) {
                    // console.log(val[0].GetCharityByRegisteredCharityNumberResult.CharityName);
                    expect(val[0].GetCharityByRegisteredCharityNumberResult.CharityName)
                        .to.equal("JAMIA MASJID & MADRASSA FAIZ UL QURAN GHOUSIA");
                    expect(val[1].GetCharityByRegisteredCharityNumberResult.CharityName)
                        .to.equal("JAMIAT AHL-E-HADITH OLDHAM");
                });
        });
    });
});


