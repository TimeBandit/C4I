/*jshint esversion: 6 */

// const soap = require('soap');

// const default_url = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';

// export function GetCharitiesByKeyword(args, url = default_url) {
//     // return the search results
//     const createClientSync = Meteor.wrapAsync(soap.createClient);
//     const client = createClientSync(url);

//     const GetCharitiesByKeywordSync = Meteor.wrapAsync(client.GetCharitiesByKeyword);
//     const res = GetCharitiesByKeywordSync(args);

//     return res;
// }

/* alternative implementation using promises */

export function charComm(url = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl') {

    function createClient() {

        console.log('creating client');
        const soap = require('soap');

        return new Promise(function(resolve, reject) {

            soap.createClient(url, function(err, client) {

                if (err) {

                    console.log('Client creattion failed with error: ${err}');
                    reject(err);
                } else {

                    resolve(client);
                }
            });
        });
    }

    function operation(operationName, client, args) {

        /* 
            For full list of method names & their args see:
            http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/Docs/DevGuideHome.aspx
        */

        if (!client) {

            return Promise.reject('Please supply a valid client object using the createClient operation');
        }

        return new Promise(function(resolve, reject) {

            client[operationName](args, function(err, result) {

                if (err) {

                    console.log('${operationName} call failed with error: ${err}');
                    reject(err);

                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    }

    // Adapter Pattern
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

    return {
        'createClient': function() {
            return createClient();
        },
        // Accepts multiple search criteria variables and returns a list of matching Charities.
        // 'GetCharities': operation('GetCharities', args),
        // Allows you to search charities by Keyword
        'GetCharitiesByKeyword': function(args) {
            createClient().then(function(client) {
                return operation('GetCharitiesByKeyword', client, args);
            })
            .catch(function(reason) {
                console.log(reason);
            });
        }
    };

}
