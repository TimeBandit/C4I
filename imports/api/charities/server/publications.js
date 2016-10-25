import { Charities } from '../charities'

Meteor.publish('max.gross.income', function() {

  return Charites.findOne(
	{"GrossIncome": {$type: "number"}},
	{sort: {"GrossIncome": -1 })

});

// db.charities.find(
// 	{"GrossIncome": {$type: "number"}})
// 		.sort({"GrossIncome": -1})[0]