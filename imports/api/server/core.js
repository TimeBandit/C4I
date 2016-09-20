/*jshint esversion: 6 */
const ccAPI = require('charity-commission-api');
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
// 
const test = {
    RegisteredCharityNumber: 1102307,
    SubsidiaryNumber: 0,
    CharityName: 'JAMIA MASJID & MADRASSA FAIZ UL QURAN GHOUSIA',
    MainCharityName: 'JAMIA MASJID & MADRASSA FAIZ UL QURAN GHOUSIA',
    RegistrationStatus: 'Registered',
    PublicEmailAddress: 'mr.yasin@aol.co.uk',
    MainPhoneNumber: '07968 794080'
};

export const GetCharitiesByOneKeyword = function(client, args) {
    return new Promise(function(resolve, reject) {
        client.GetCharitiesByKeyword(args, function(err, result) {
        	resolve([{}]);
        	
        	// console.log(result.GetCharitiesByKeywordResult.CharityList);
            // if (err) { reject(err); }
            // if (result) { resolve(result.GetCharitiesByKeywordResult.CharityList); }
            // if (!result) { reject(Error("Network Error")); }
        });
    });
};
// GetCharitiesByKeywordList
export const bbb = function(client, args, list) {
	console.log('**********');
    return new Promise(function(reject, resolve) {
    	resolve(5);
    	// reject(Error('errored'));
        // let res = [];
        // if (!list) {
        //     reject(Error('Search list cannot be empty'));
        // } else {
        //     list.forEach(function(e, i, list) {
        //         res.push(
        //             GetCharitiesByOneKeyword(client, { APIKey: args.APIKey, strSearch: e })
        //         );
        //     });
        //     // console.log(res);
        //     Promise.all(res)
        //         .then(function(value) {
        //             console.log('the results');
        //             // console.log(value);
        //             resolve(value);
        //         })
        //         .catch(function(err) {
        //             console.log(err);
        //         });
        // }
    });
};
