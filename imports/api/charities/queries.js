// set of homepage queries to be used on client & server
//1125833 
//328158
// import { Charities } from './charities';

// top 10 queries
// export const topGrossIncomeQuery = Charities.find({
//   $or: [{ "GrossIncome": { $type: 1 } }, { "GrossIncome": { $type: 16 } }, { "GrossIncome": { $type: 18 } }],
//   "RegistrationHistory.RemovalReason": { $eq: "" }
// }, {
//   sort: { "GrossIncome": -1 },
//   limit: 10
// });
// export const topGrossIncomeQuery = Charities.find(
//   { "RegistrationHistory.RemovalReason": { $eq: "" } }, 
//   {
//     sort: { "Submission.GrossIncome > 1": -1 },
//     limit: 10
//   });

// export const topTotalExpenditureQuery = Charities.find({
//   $or: [{ "TotalExpenditure": { $type: 1 } }, { "TotalExpenditure": { $type: 16 } }, { "TotalExpenditure": { $type: 18 } }],
//   "RegistrationHistory.RemovalReason": { $eq: "" }
// }, {
//   sort: { "TotalExpenditure": -1 },
//   limit: 10
// });

// export const topEmployeesQuery = Charities.find({
//   "Employees": { $ne: "" },
//   "RegistrationHistory.RemovalReason": { $eq: "" }
// }, {
//   sort: { "Employees": -1 },
//   limit: 10
// });

// export const topVolunteersQuery = Charities.find({
//   $or: [{ "Volunteers": { $type: 1, $gt: 0 } }, { "Volunteers": { $type: 16, $gt: 0 } }, { "Volunteers": { $type: 18, $gt: 0 } }],
//   "RegistrationHistory.RemovalReason": { $eq: "" }
// }, {
//   sort: { "Volunteers": -1 },
//   limit: 10
// });
//
// export const searchContent = Charities.find(
//   {}, 
//   { 
//     fields: {_id:1, CharityName: 1, RegisteredCharityNumber: 1 }
//   });

// export const currentCharity = function(val) {
//   return Charities.find({ "RegisteredCharityNumber": val })
// }
