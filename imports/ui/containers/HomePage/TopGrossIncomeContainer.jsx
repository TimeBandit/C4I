import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Charities from '../../../api/charities/charities';
import { topGrossIncomeQuery } from '../../../api/charities/queries'
import TopGrossIncomeList from '../../components/HomePage/TopGrossIncomeList'

// returns the top ten
export default createContainer(() => {
  const handle = Meteor.subscribe('top.gross.income');
  const loading = !handle.ready();
  const result = topGrossIncomeQuery.fetch();
  const resultExists = !loading && !!result;

  return {
    loading,
    resultExists,
    result: resultExists ? result : []
  };
}, TopGrossIncomeList);
