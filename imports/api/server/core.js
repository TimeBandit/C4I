/*jshint esversion: 6 */
const ccAPI = require('charity-commission-api');
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
require("babel-polyfill");
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

export const GetCharitiesByOneKeyword = function(client, args, delay = 500) {
    return new Promise(function(resolve, reject) {
        // sleep prevents server hammering
        sleep(choose(delay))
            .then(function() {
                client.GetCharitiesByKeyword(args, function(err, result) {
                    if (err) { reject(err); }
                    if (result) {
                        resolve(
                            result.GetCharitiesByKeywordResult.CharityList
                        );
                    }
                    if (!result) { reject(new Error("Network Error")); }
                });
            });
    });
};

// GetCharitiesByKeywordList
export const GetCharitiesByKeywordList = function(client, args, list) {
    // console.log(arguments);
    if (list.length === 0) {
        throw new Error('Cannot have an empty list');
    }
    if (list.lenght > 0) {
        forEach(function(e, i, l) {
            if (typeof e === 'string') {
                throw new Error('Search items can only be strings');
            }
        });
    }
    return new Promise(function(resolve, reject) {
        const res = [];

        list.forEach(function(e, i, list) {
            console.log(`Keyword => ${e}`);
            res.push(
                GetCharitiesByOneKeyword(client, { APIKey: args.APIKey, strSearch: e })
            );
            // setTimeout(function() {
            // }, 500 * i);
        });

        Promise.all(res)
            .then(function(val) {
                // console.log(val);
                resolve({
                    client,
                    res: buildCharNumList(val)
                });
            });
    });
};

export const buildCharNumList = function(data) {
    let res = [];
    data.forEach(function(e, i, arr) {
        e.forEach(function(el, idx, arr) {
            let charNum = el.RegisteredCharityNumber;
            if (res.indexOf(charNum) === -1) {
                res.push(charNum);
            }
        });
    });
    return res;
};

export const getCharityByRegisteredCharityNumber = function(client, args, delay = 2000) {
    return new Promise(function(resolve, reject) {
        // sleep prevents server hammering
        client.GetCharityByRegisteredCharityNumber(args, function(err, result) {
            if (err) { reject(err); }
            if (result) {
                console.log(
                    `Resolved 𖦸 \t ${result.GetCharityByRegisteredCharityNumberResult.CharityName}`
                );
                resolve(
                    result
                );
            }
            if (!result) { reject(new Error("Network Error")); }
        });
        // sleep(delay)
        //     .then(function() {
        //     });
    });
};
// not using generators until I up my JS game
export const charityGenerator = function*(client, args, charityIds) {
    console.log(args, charityIds, charityIds.length);
    while (charityIds.length !== 0) {
        yield getCharityByRegisteredCharityNumber(
            client, { APIKey: args.APIKey, registeredCharityNumber: charityIds.pop() }
        );
    }
};

export const fetchAllCharities = function(client, args, charityIds) {
    return new Promise(function(resolve, reject) {
        const res = [];
        const delay = 1000;

        charityIds.forEach(function(e, i, list) {
            setTimeout(function() {
                console.log(`fetching ${e}`);
                res.push(
                    getCharityByRegisteredCharityNumber(
                        client, { APIKey: args.APIKey, registeredCharityNumber: e }
                    )
                );
            }, delay * i);
        });

        setTimeout(function() {
            console.log(res.length);
            Promise.all(res)
                .then(function(val) {
                    resolve(val);
                })
                .catch(function(error) {
                    throw error;
                });

        }, delay * charityIds.length);
    });
};
