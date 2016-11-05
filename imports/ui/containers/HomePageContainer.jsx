import { Meteor } from 'meteor/meteor';
import { Charities } from '../../api/charities/charities'
import { createContainer } from 'meteor/react-meteor-data';
import HomePage from '../pages/HomePage'
import { topGrossIncomeQuery, bottomGrossIncomeQuery, topTotalExpenditureQuery, bottomTotalExpenditureQuery } from '../../api/charities/queries';

// creates a container around the app componenet
// & feeds in all the data sources
export default createContainer(() => {

  const topGrossIncomeSubscription = Meteor.subscribe('top.gross.income');
  const bottomGrossIncomeSubscription = Meteor.subscribe('bottom.gross.income');
  
  const topTotalExpenditureSubscription = Meteor.subscribe('top.total.expenditure');
  const bottomTotalExpenditureSubscription = Meteor.subscribe('bottom.total.expenditure');

  const loading = !topGrossIncomeSubscription.ready();

  return {
    topGrossIncomeSubscription,
    loading,
    topGrossIncome: topGrossIncomeQuery().fetch()[0],
    bottomGrossIncome: bottomGrossIncomeQuery().fetch()[0],
    topTotalExpenditure: topTotalExpenditureQuery().fetch()[0],
    bottomTotalExpenditure: bottomTotalExpenditureQuery().fetch()[0]
  };
}, HomePage);
