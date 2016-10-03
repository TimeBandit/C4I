/*jshint esversion: 6 */
const chai = require("chai");
import * as sinon from 'sinon';
import { GetCharitiesByOneKeyword, GetCharitiesByKeywordList, choose, buildCharNumList, sleep, charityDataset, charityGenerator, fetchAllCharities, defined, extractCurrentSubmission } from '../imports/api/server/core';
import { testData, listOfList, expected, subMissionList } from './testData'
// 
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
// 
const ccAPI = require('charity-commission-api');
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
const settings = require("../settings-development.json");
const APIKey = settings.private.charity_commission.api_key;
const searchTerms = settings.private.search_terms;

describe('Core', function() {
    describe.skip('createClient():', function() {
        it('should create a valid client', function() {
            return ccAPI.createClient(ccAPIUrl).then(function(client) {
                expect(client).to.respondTo('GetCharities');
            });
        });
    });
    describe.skip('choose():', function() {
        it('return a number that is at most 20', function() {
            expect(choose(20)).to.be.at.most(20);
        });
    });
    describe.skip('GetCharitiesByOneKeyword():', function() {
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
    describe.skip('GetCharitiesByKeywordList():', function() {
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
                    const { res } = val;
                    expect(res).to.be.instanceof(Array);
                    expect(res[0]).to.respondTo('toString');
                });
        });
    });
    describe.skip('buildCharNumList():', function() {
        it('given correct dataset should build a list of unique charity numbers', function() {
            expect(buildCharNumList(listOfList)).to.deep.equal(expected);
        });
    });
    describe.skip('fetchAllCharities()', function() {
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
            this.timeout(4000);
            // 1102307, 1143183
            return fetchAllCharities(client, { APIKey }, [1102307, 1143183])
                .then(function(val) {
                    // console.log(val[0].GetCharityByRegisteredCharityNumberResult.CharityName);
                    expect(val[0].GetCharityByRegisteredCharityNumberResult.CharityName)
                        .to.equal("JAMIA MASJID & MADRASSA FAIZ UL QURAN GHOUSIA");
                    expect(val[1].GetCharityByRegisteredCharityNumberResult.CharityName)
                        .to.equal("JAMIAT AHL-E-HADITH OLDHAM");

                    console.log(val[1].GetCharityByRegisteredCharityNumberResult);

                    // .Returns[0].AssetsAndLiabilities.Funds.TotalFunds);
                    // if (defined(val[0].GetCharityByRegisteredCharityNumberResult.Returns[0], 'AssetsAndLiabilities.Funds.TotalFunds')) {
                    // }
                });
        });

    });
    describe.skip('defined()', function() {
        const obj = {
            a: {
                b: {
                    c: {
                        x: 1,
                        y: 2
                    }
                }
            }
        };

        it('return true when a nested object key exists', function() {
            const res = defined(obj, 'a.b.c.x');
            expect(res).to.be.ok;
        });
        it('return false when a nested object key exists', function() {
            const res = defined(obj, 'a.b.c.z');
            expect(res).to.be.not.ok;
        });
    });
    describe('extractCurrentSubmission', function() {
        it('should latest valid financial data', function() {
            const expected = {
                MailingCycle: 'AR15',
                FyStart: '01 May 2014',
                FyEnd: '30 Apr 2015',
                AnnualReturnReceivedDate: '29 Feb 2016',
                AccountsReturnReceivedDate: '29 Feb 2016',
                GrossIncome: '426527',
                TotalExpenditure: '412574'
            };

            expect(extractCurrentSubmission(subMissionList)).to.deep.equal(expected);            
        });

    });
    describe('integration tests', function() {
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
        it.skip('returns eventually return [true, true, true]', function() {
            return step1()
                .then(step2)
                .then(step3)
                .then(function(res) {
                    expect(res).to.deep.equal([true, true, true]);
                });
        });
        it('execute promise stack', function() {
            this.timeout(30000);
            return ccAPI.createClient(ccAPIUrl)
                .then(function(client) {
                    // console.log(searchTerms);
                    return GetCharitiesByKeywordList(client, { APIKey }, ["madrassa"]);
                })
                .then(function(obj) {
                    const { client, res } = obj;
                    // console.log(typeof res);
                    return fetchAllCharities(client, { APIKey }, res);
                })
                .then(function(val) {
                    expect(val[0].GetCharityByRegisteredCharityNumberResult).to.have.any.keys([
                        'RegisteredCharityNumber',
                        'SubsidiaryNumber',
                        'CharityName',
                        'MainCharityName',
                        'RegistrationStatus',
                        'PublicEmailAddress',
                        'MainPhoneNumber'
                    ]);
                    let counter = 0;
                    val.forEach(function(el, idx, arr) {
                        // console.log(el.GetCharityByRegisteredCharityNumberResult.CharityName);
                        // console.log(defined(el, 'GetCharityByRegisteredCharityNumberResult.Returns'));
                        if (defined(el, 'GetCharityByRegisteredCharityNumberResult.Submission')) {
                            console.log(extractCurrentSubmission(el.GetCharityByRegisteredCharityNumberResult.Submission));
                            counter++;
                        }
                    });
                    console.log(`${counter} charities of ${val.length} had submissions data`);

                    // 8 charities of 82 had returns data
                    // 75 charities of 82 had submissions data
                })
                .catch(function(error) {
                    throw error;
                });
        });
    });
});

// const charity = val[0];
