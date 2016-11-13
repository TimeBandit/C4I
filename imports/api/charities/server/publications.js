import { Meteor } from 'meteor/meteor';
import { Charities } from '../charities'

Meteor.publish('top.gross.income', function() {
  return Charities.find({
    "GrossIncome": { $type: 1 }
  }, {
    sort: { "GrossIncome": -1 },
    limit: 10
  });
});

Meteor.publish('bottom.gross.income', function() {
  return Charities.find({
    "GrossIncome": { $type: 1, $gt: 0 }
  }, {
    sort: { "GrossIncome": 1 }
  });
});
// 
Meteor.publish('top.total.expenditure', function() {
  return Charities.find({
    "TotalExpenditure": { $type: 1 }
  }, {
    sort: { "TotalExpenditure": -1 }
  });
});

Meteor.publish('bottom.total.expenditure', function() {
  return Charities.find({
    "TotalExpenditure": { $type: 1, $gt: 0 }
  }, {
    sort: { "TotalExpenditure": 1 }
  });
});
// 
Meteor.publish('top.employees', function(registeredCharityNumber) {
  return Charities.find({
    "Employees": { $type: 1 }
  }, {
    sort: { "Employees": -1 }
  });
});

Meteor.publish('top.volunteers', function(registeredCharityNumber) {
  return Charities.find({
    "Volunteers": { $type: 1 }
  }, {
    sort: { "Volunteers": -1 }
  });
});
// 
Meteor.publish('current.charity', function(registeredCharityNumber) {
  return Charities.find({"RegisteredCharityNumber": val});
});
