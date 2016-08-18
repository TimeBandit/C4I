/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';
import { CharityList } from '../../api/server/charitylist';
import { GetCharitiesByKeyword } from '../../api/server/charityAPI';

Meteor.startup(function () {
	// init the db here
	if (CharityList.find().count() === 0 ) {
		console.log('CharityList is empty :)');

		let args = {APIKey: '755dfeae-434d-4c90-a', strSearch: 'islam'};
		// run the api funtion and store the result in a collection
		const url = 'http://apps.charitycommission.gov.uk/Showcharity/API/SearchCharitiesV1/SearchCharitiesV1.asmx?wsdl';
		
		console.log(GetCharitiesByKeyword(args));

		// run a reactive function to fetch induvidual charity info
		// calculate the derived data
	}
});