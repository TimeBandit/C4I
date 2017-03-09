import { Meteor } from 'meteor/meteor';
// import { Random } from 'meteor/random';
import { Charities } from '../charities'
// import { 
//   topGrossIncomeQuery, 
//   topTotalExpenditureQuery, 
//   topEmployeesQuery, 
//   topVolunteersQuery, 
//   searchContent 
// } from '../queries';

// const cumulatives = Charities.aggregate({
//   $match: {
//     "GrossIncome": { $type: 16 },
//     "TotalExpenditure": { $type: 16 },
//     "Employees": { $type: 16 },
//     "Volunteers": { $type: 16 }
//   }
// }, {
//   $group: {
//     _id: null,
//     GrossIncome: { $sum: "$GrossIncome" },
//     TotalExpenditure: { $sum: "$TotalExpenditure" },
//     Employees: { $sum: "$Employees" },
//     Volunteers: { $sum: "$Volunteers" }
//   }
// });
// // cumulatives
// Meteor.publish('top.gross.income', function() {
//   return topGrossIncomeQuery;
// });

// Meteor.publish('top.total.expenditure', function() {
//   return topTotalExpenditureQuery;
// });

// Meteor.publish('top.employees', function() {
//   return topEmployeesQuery;
// });

// Meteor.publish('top.volunteers', function() {
//   return topVolunteersQuery;
// });

// Meteor.publish('cumulative.stats', function() {
//   let self = this;
//   self.added('CumulativeStats', Random.id(), ...cumulatives);
//   self.ready();
// });
// 
// Meteor.publish('search.data', function() {
//   return searchContent;
// });

Meteor.publish('current.charity', function(registeredCharityNumber) {
  const res = Charities.find({ "RegisteredCharityNumber": registeredCharityNumber });
  console.info(`PUBLISHING DATA FOR ${registeredCharityNumber}`);
  return res;
});
