import { Meteor } from 'meteor/meteor';
import { Charities } from '../charities'
import { topGrossIncomeQuery } from '../queries';

Meteor.publish('top.gross.income', function() {
  return topGrossIncomeQuery;
});
