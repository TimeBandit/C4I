/*jshint esversion: 6 */

// const chai = require("chai");
// const chaiAsPromised = require("chai-as-promised");
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { searchForCharities, truey } from '../imports/api/server/core';
chai.use(chaiAsPromised.default);
const should = chai.should();
const expect =  chai.expect;
const assert = chai.assert;
// 
const ccAPI = require('charity-commission-api');
describe('Core', function() {

	// const client = {
	// 	GetCharitiesByKeyword
	// };
    describe('Test Promise pattern', function() {
    	function step1() {
    		return new Promise(function (resolve, reject) {
    			resolve([true]);
    		});
    	}

    	function step2(val) {
    		return new Promise(function (resolve, reject) {
    			if (val) {resovle(val.push(true));}
    		});
    	}

    	function step3(val) {
    		return new Promise(function (resolve, reject) {
    			if (val) {resovle(val.push(true));}
    		});
    	}
        it('returns eventually return [true, true, true]', function() {
            step1()
            	.then(step2)
            	.then(step3)
            	.then(function (res) {
            		return res.should.eventually.equal([true,true,true]);
            	});
            assert.equal(true, true);
        });

    });
    describe('createClient()', function() {
        it('should should create a client', function () {
        	const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
        	return ccAPI.createClient(ccAPIUrl).should.be.fulfilled;
        });
        it('should return error when no API url given', function () {
        	const ccAPIUrl = '';
        	return ccAPI.createClient(ccAPIUrl).should.be.rejected;
        });
    });
    describe('searchForCharities()', function () {
    	it('should eventually be fullfilled', function () {
    		return searchForCharities().should.be.fulfilled;
    	});
    });    
});
