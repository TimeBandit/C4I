/*jshint esversion: 6 */
const ccAPI = require('charity-commission-api');
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';

export const GetCharitiesByOneKeyword = function(client, args) {
    return new Promise(function(resolve, reject) {
        client.GetCharitiesByKeyword(args, function(err, result) {
        	// resolve(2);
            if (err) { reject(err); }
            if (result) { resolve(result.GetCharitiesByKeywordResult.CharityList); }
            if (!result) { reject(Error("Network Error")); }
        });
    });
};



export const GetCharitiesByKeywordList = function(client, list, args) {
    return new Promise(function(reject, resolve) {
        let res = [];
        if (!list) {
            reject(Error('Search list cannot be empty'));
        } else {
            list.forEach(function(e, i, list) {
                res.push(
                	GetCharitiesByOneKeyword(client, { APIKey: args.APIKey, strSearch: e })
                	);
            });
            // console.log(res);
            Promise.all(res)
                .then(function(value) {
                	console.log('the results');
                    // console.log(value);
                    resolve(value);
                })
                .catch(function (err) {
                	console.log(err);
                });
        }
    });
};
