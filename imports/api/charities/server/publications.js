import { Meteor } from 'meteor/meteor';
import { Charities } from '../charities'
import { 
	topGrossIncomeQuery, 
	bottomGrossIncomeQuery, 
	topTotalExpenditureQuery, 
	bottomTotalExpenditureQuery 
} from '../queries';

Meteor.publish('top.gross.income', function() {
  return topGrossIncomeQuery;
});

Meteor.publish('bottom.gross.income', function() {
  return bottomGrossIncomeQuery;
});

Meteor.publish('top.total.expenditure', function() {
  return topTotalExpenditureQuery;
});

Meteor.publish('bottom.total.expenditure', function() {
  return bottomTotalExpenditureQuery;
});

Meteor.publish('current.charity', function(registeredCharityNumber) {
  return currentCharity(registeredCharityNumber);
});
