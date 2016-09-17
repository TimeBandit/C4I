/*jshint esversion: 6 */
import { testData } from '../../../tests/testData';
export const truey = function() {
	return true;
};

export const searchForCharities = function (client, args) {
	// console.log(args);
	return new Promise(function (resolve, reject) {
		resolve();
		// client.GetCharitiesByKeyword(args, function(err, result) {
		// 	resolve(testData);
		// });
	});
};