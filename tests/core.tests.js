/*jshint esversion: 6 */
const chai = require("chai");
import * as sinon from 'sinon';
import {
  GetCharitiesByOneKeyword,
  GetCharitiesByKeywordList,
  choose,
  buildCharNumList,
  sleep,
  charityDataset,
  charityGenerator,
  fetchAllCharities,
  defined,
  extractCurrentSubmission,
  makeData,
  step1,
  step2,
  step3,
  trueDate,
  parseAdressObject,
  adressObjToURI
} from '../imports/api/charities/server/core';

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
  describe('utility methods:', function() {
    // choose()
    it('choose() return a number that is at most 20', function() {
      expect(choose(20)).to.be.at.most(20);
    });
    // trueDate()
    it('return convert a date string to a date object', function() {
      expect(trueDate('10/09/2010 13:36:00').toString())
        .to.equal('Sun Oct 10 2010 13:36:00 GMT+0100 (BST)');
    });
    it('return a black string when given one', function() {
      expect(trueDate(''))
        .to.equal('');
    });
    it('should return a valid date object if no time passed', function() {
      expect(trueDate('10/09/2010').toString())
        .to.equal('Sun Oct 10 2010 00:00:00 GMT+0100 (BST)');
    });
    // defined()
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
    // parseAdressObject
    const adressObject = {
      Line1: "11 ROSS STREET",
      Line2: "OLDHAM",
      Line3: "LANCASHIRE",
      Line4: "",
      Line5: "",
      Postcode: "OL8 1UA"
    }

    const res = "11 ROSS STREET, OLDHAM, LANCASHIRE, OL8 1UA";
    const URIres = "11%20ROSS%20STREET%2C%20OLDHAM%2C%20LANCASHIRE%2C%20OL8%201UA"

    it('should concatenate each valid property into a single string', function() {
      expect(parseAdressObject(adressObject)).to.equal(res);
    });
    it('should convert an adress object to a URI encoded string', function() {
      expect(adressObjToURI(adressObject)).to.equal(URIres);
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
        });
    });

  });
  describe.skip('defined()', function() {});
  describe.skip('extractCurrentSubmission', function() {
    it('should extract latest valid financial submission', function() {
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
  describe.skip('integration tests', function() {

    it('returns eventually return [true, true, true]', function() {
      return step1()
        .then(step2)
        .then(step3)
        .then(function(res) {
          expect(res).to.deep.equal([true, true, true]);
        });
    });
    it('execute promise stack', function() {
      // console.log('lets go!');
      this.timeout(30000);
      // console.log('setting timeout');
      return ccAPI.createClient(ccAPIUrl)
        .then(function(client) {
          // console.log('searching for charitites');
          return GetCharitiesByKeywordList(client, { APIKey }, ["madrassa"]);
        })
        .then(function(obj) {
          // console.log('fetching all charities');
          const { client, res } = obj;
          return fetchAllCharities(client, { APIKey }, res);
        })
        .then(function(val) {
          // console.log(val[0].GetCharityByRegisteredCharityNumberResult);
          expect(val[0].GetCharityByRegisteredCharityNumberResult).to.have.any.keys([
            'RegisteredCharityNumber',
            'SubsidiaryNumber',
            'CharityName',
            'MainCharityName',
            'RegistrationStatus',
            'PublicEmailAddress',
            'MainPhoneNumber'
          ]);

          expect(makeData(val)[0]).to.have.all.keys([
            'CharityName',
            'RegisteredCharityNumber',
            'RegistrationHistory',
            'RegistrationDate',
            'Address',
            'PublicTelephoneNumber',
            'PublicFaxNumber',
            'EmailAddress',
            'WebsiteAddress',
            'Activities',
            'Trustees',
            'GrossIncome',
            'TotalExpenditure',
            'Employees',
            'Volunteers',
          ]);

          // 8 charities of 82 had returns data
          // 75 charities of 82 had submissions data
        })
        .catch(function(error) {
          throw error;
        });
    });
  });
});
