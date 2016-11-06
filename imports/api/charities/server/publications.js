import { Meteor } from 'meteor/meteor';
import { Charities } from '../charities'
import { 
	topGrossIncomeQuery, 
	bottomGrossIncomeQuery, 
	topTotalExpenditureQuery, 
	bottomTotalExpenditureQuery,
	topEmployeesQuery, 
	topVolunteersQuery
} from '../queries';

Meteor.publish('top.gross.income', function() {
  return topGrossIncomeQuery;
});

Meteor.publish('bottom.gross.income', function() {
  return bottomGrossIncomeQuery;
});
// 
Meteor.publish('top.total.expenditure', function() {
  return topTotalExpenditureQuery;
});

Meteor.publish('bottom.total.expenditure', function() {
  return bottomTotalExpenditureQuery;
});
// 
Meteor.publish('top.employees', function(registeredCharityNumber) {
  return topEmployeesQuery;
});

Meteor.publish('top.volunteers', function(registeredCharityNumber) {
  return topVolunteersQuery;
});
// 
Meteor.publish('current.charity', function(registeredCharityNumber) {
  return currentCharity(registeredCharityNumber);
});

