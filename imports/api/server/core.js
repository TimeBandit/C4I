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

export const choose = function(range) {
    return Math.floor((Math.random() * range) + 1);
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
        // sleep prevent server hammering
        sleep(choose(20))
            .then(function() {
                client.GetCharitiesByKeyword(args, function(err, result) {
                    if (err) { reject(err); }
                    if (result) {
                        resolve(
                            result.GetCharitiesByKeywordResult.CharityList
                        );
                    }
                    if (!result) { reject(Error("Network Error")); }
                });
            });
    });
};
// GetCharitiesByKeywordList
export const GetCharitiesByKeywordList = function(client, args, list) {
    if (list.length === 0) {
        throw new Error('Cannot have an empty list');
    }
    if (list.lenght > 0) {
    	forEach(function (e, i, l) {
    		if (typeof e === 'string') {
    			throw new Error('Search items can only be strings');
    		}
    	});
    }
    return new Promise(function(resolve, reject) {
        const res = [];

        list.forEach(function(e, i, list) {
            res.push(
                GetCharitiesByOneKeyword(client, { APIKey: args.APIKey, strSearch: e })
            );
        });

        Promise.all(res)
            .then(function(val) {
                resolve(val);
            });
    });
};

export const buildCharNumList = function(data){
	console.log(data);
	forEach(function (e, i, arr) {
		forEach(function (el, idx, arr) {
			console.log(el.RegisteredCharityNumber);
		});
	});

};