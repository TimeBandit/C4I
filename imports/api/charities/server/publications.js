import { Meteor } from 'meteor/meteor';
import { Charities } from '../charities'
import { topGrossIncomeQuery, topTotalExpenditureQuery, topEmployeesQuery, topVolunteersQuery } from '../queries'

Meteor.publish('top.gross.income', function() {
  return topGrossIncomeQuery;
});

Meteor.publish('top.total.expenditure', function() {
  return topTotalExpenditureQuery
});

Meteor.publish('top.employees', function(registeredCharityNumber) {
  return topEmployeesQuery
});

Meteor.publish('top.volunteers', function(registeredCharityNumber) {
  return topVolunteersQuery
});
// 
// Meteor.publish('bottom.gross.income', function() {
//   return Charities.find({
//     "GrossIncome": { $type: 1, $gt: 0 }
//   }, {
//     sort: { "GrossIncome": 1 }
//   });
// });

// Meteor.publish('bottom.total.expenditure', function() {
//   return Charities.find({
//     "TotalExpenditure": { $type: 1, $gt: 0 }
//   }, {
//     sort: { "TotalExpenditure": 1 }
//   });
// });
// 
Meteor.publish('current.charity', function(registeredCharityNumber) {
  return Charities.find({"RegisteredCharityNumber": val});
});
