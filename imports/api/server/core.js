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

export const sleep = function(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            // process.stdout.write(".");
            resolve(true);
        }, time);
    });
};

export const GetCharitiesByOneKeyword = function(client, args) {
    return new Promise(function(resolve, reject) {
        client.GetCharitiesByKeyword(args, function(err, result) {
            // resolve([2]);
            // console.log(result.GetCharitiesByKeywordResult.CharityList);
            if (err) { reject(err); }
            if (result) { resolve(result.GetCharitiesByKeywordResult.CharityList); }
            if (!result) { reject(Error("Network Error")); }
        });
    });
};
// GetCharitiesByKeywordList
export const GetCharitiesByKeywordList = function(client, args, list) {
    return new Promise(function(reject, resolve) {
        const res = [];

        if (list.length === 0) {
            reject(Error('Search list cannot be empty'));
        } else {
            list.forEach(function(e, i, list) {
                res.push(
                    GetCharitiesByOneKeyword(client, { APIKey: args.APIKey, strSearch: e })
                );
            });
            resolve(res);
        }
    });
};
