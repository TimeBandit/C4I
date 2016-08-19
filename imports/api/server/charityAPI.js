/*jshint esversion: 6 */

const soap = require('soap');

const default_url = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';

export function GetCharitiesByKeyword(args, url = default_url) {
    // return the search results
    const createClientSync = Meteor.wrapAsync(soap.createClient);
    const client = createClientSync(url);

    const GetCharitiesByKeywordSync = Meteor.wrapAsync(client.GetCharitiesByKeyword);
    const res = GetCharitiesByKeywordSync(args);

    return res;
}

// alternative implementation using promises