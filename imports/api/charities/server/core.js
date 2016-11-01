/*jshint esversion: 6 */
const ccAPI = require('charity-commission-api');
const ccAPIUrl = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
require("babel-polyfill");
// 

export const GetCharitiesByOneKeyword = function(client, args, delay = 500) {
    return new Promise(function(resolve, reject) {
        // sleep prevents server hammering
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
            // console.log(client);
            console.log(`Keyword => ${e}`);
            res.push(
                GetCharitiesByOneKeyword(client, { APIKey: args.APIKey, strSearch: e })
            );
        });

        Promise.all(res)
            .then(function(val) {
                // console.log(val);
                resolve({
                    client,
                    res: buildCharNumList(val)
                });
            }).catch(function(error) {
                throw error;
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
                // process.stdout.clearLine();
                // process.stdout.cursorTo(0);
                console.log(
                    `${result.GetCharityByRegisteredCharityNumberResult.CharityName} - resolved`
                );
                resolve(
                    result
                );
            }
            if (!result) { reject(new Error("Network Error")); }
        });
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
        let res = [];
        const delay = 500;
        charityIds.forEach(function(e, i, list) {
            setTimeout(function() {
                res.push(
                    getCharityByRegisteredCharityNumber(client, {
                        APIKey: args.APIKey,
                        registeredCharityNumber: e
                    }));
            }, delay * i);
        });

        setTimeout(function() {
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

export const extractCurrentSubmission = function(list) {
    let res = list[list.length - 1];

    list.forEach(function(el, idx, arr) {
        if (el.GrossIncome !== '') {
            res = el;
        }
    });
    // console.log(res);
    return res;
};


export const makeData = function(list) {
    let result = list.map(function(el) {
        let data = {
            CharityName: "",
            RegisteredCharityNumber: "",
            RegistrationHistory: "",
            Address: "",
            PublicTelephoneNumber: "",
            PublicFaxNumber: "",
            EmailAddress: "",
            WebsiteAddress: "",
            Activities: "",
            Trustees: "",
            GrossIncome: "",
            TotalExpenditure: "",
            Employees: "",
            Volunteers: ""
        };

        const res = el.GetCharityByRegisteredCharityNumberResult;

        data.CharityName = res.CharityName;
        data.RegisteredCharityNumber = res.RegisteredCharityNumber;
        data.RegistrationHistory = {
            RegistrationDate: trueDate(res.RegistrationHistory[0].RegistrationDate),
            RegistrationRemovalDate: trueDate(res.RegistrationHistory[0].RegistrationRemovalDate),
            RemovalReason: res.RegistrationHistory[0].RemovalReason

        };
        data.Address = res.Address;
        data.PublicTelephoneNumber = res.PublicTelephoneNumber;
        data.PublicFaxNumber = res.PublicFaxNumber;
        data.EmailAddress = res.EmailAddress;
        data.WebsiteAddress = res.WebsiteAddress;
        data.Activities = res.Activities;
        data.Trustees = res.Trustees;

        if (defined(res, 'Submission')) {

            const submission = extractCurrentSubmission(res.Submission);
            data.GrossIncome = parseInt(submission.GrossIncome);
            data.TotalExpenditure = parseInt(submission.TotalExpenditure);
        }

        if (defined(res, 'Returns')) {

            data.Employees = parseInt(res.Returns[0].Employees.NoEmployees);
            data.Volunteers = parseInt(res.Returns[0].Employees.NoVolunteers);
        }

        return data;
    });
    // console.log(result);
    return result;
};

// utility functions

export const trueDate = function(dateTimeString) {
    if (!dateTimeString) {
        return '';
    }

    const splitInput = dateTimeString.split(' ');

    const datePart = splitInput[0].split('/').reverse();
    let timePart = [];

    if (splitInput[1]) {
        timePart = splitInput[1].split(':').map(function(val) {
            return parseInt(val);
        });

    }
    const args = datePart.map(function(val) {
        return parseInt(val);
    }).concat(timePart);

    return new Date(...args);
};

export const step1 = function step1() {
    return new Promise(function(resolve, reject) {
        resolve([true]);
    });
};

export const step2 = function step2(val) {
    return new Promise(function(resolve, reject) {
        resolve(val.concat(true));
    });
};

export const step3 = function step3(val) {
    return new Promise(function(resolve, reject) {
        resolve(val.concat(true));
    });
};


export const choose = function(range) {
    return Math.floor((Math.random() * range) + 1);
};

export const sleep = function(time) {
    return new Promise(function(resolve, reject) {
        Meteor.setTimeout(function() {
            // process.stdout.write(".");
            resolve(true);
        }, time);
    });
};

export const defined = function(obj, strNames) {
    let arrNames = strNames.split('.');
    let name = arrNames.shift();

    while (name) {
        if (!obj.hasOwnProperty(name)) return false;
        obj = obj[name];
        name = arrNames.shift();
    }

    return true;
};

