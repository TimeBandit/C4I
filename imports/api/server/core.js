/*jshint esversion: 6 */
const ccAPI = require('charity-commission-api');
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';

export const GetCharitiesByOneKeyword = function (client, args) {
	console.log(apiKey);
	return new Promise(function (resolve, reject) {
		client.GetCharitiesByKeyword(args, function (err, result) {
			if (err) {reject(err);}
			if (result) {resolve([client, result.GetCharitiesByKeywordResult.CharityList]);}
			if (!result) {reject(Error("Network Error"));}
		});
	});
};



export const GetCharitiesByKeywordList = function (client, list) {
	return Promise.resolve();
	// list.reduce(function (prev, keyWord) {
	// 	return sequence.then(function (keyWord) {
	// 		// body...
	// 	})
	// }, Promise.resolve());
};