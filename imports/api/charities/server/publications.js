import { Meteor } from 'meteor/meteor';
import { Charities } from '../charities'
import { topGrossIncomeQuery } from '../queries';

Meteor.publish('top.gross.income', function() {
  return topGrossIncomeQuery;
});

Meteor.publish('current.charity', function(registeredCharityNumber) {
  return currentCharity(registeredCharityNumber);
});
