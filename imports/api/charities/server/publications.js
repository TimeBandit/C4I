import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
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

Meteor.publish('charity.list', function() {
  const self = this;
  console.info("PUBLISHING DATA FOR SEARCH TABLE");
  
  function swapDateWithMonth(dateString) {
    let splitString = dateString.split("/");
    return splitString[1] + "/" + splitString[0] + "/" + splitString[2];
  };

  // returns a cursor
  const res = Charities.find({}, {
    fields: {
      CharityName: 1,
      RegisteredCharityNumber: 1,
      "Address.Postcode": 1,
      "Returns.Employees.NoEmployees": 1,
      "Returns.Resources.Incoming.Total": 1,
      Submission: 1,
      RegistrationHistory: 1
    }
  });

  res.forEach(x => {
    const RemovalReason = (((x.RegistrationHistory || [])[0] || {}).RemovalReason || "");
    let RegistrationDate = (((x.RegistrationHistory || [])[0] || {}).RegistrationDate || "");
    let Established;
    let retIncoming = (((((x.Returns || [])[0] || {}).Resources || {}).Incoming || {}).Total || 0);
    let subIncoming = (((x.Submission || []).slice(-1)[0] || {}).GrossIncome || 0);
    let Employees = ((((x.Returns || [])[0] || {}).Employees || {}).NoEmployees || "0");


    if (RegistrationDate === "") {
      Established = "";
    } else {
      Established = new Date(swapDateWithMonth(RegistrationDate));
    };

    const doc = {
      Name: x.CharityName || "",
      Number: x.RegisteredCharityNumber || "",
      Established: Established.getFullYear(),
      Active: RemovalReason === "" ? "Yes" : "No",
      Incoming: parseInt(retIncoming || subIncoming),
      Employees: parseInt(Employees),
      Postcode: ((x.Address || {}).Postcode || ""),
    }
    self.added('CharityList', Random.id(), doc);
  });

  self.ready();
});
