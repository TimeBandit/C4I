import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Charities from '../../../api/charities/charities';
import { topGrossIncomeQuery } from '../../../api/charities/queries'
import TopGrossIncome from '../../components/HomePage/TopGrossIncome'

// creates a container around the app componenet
// & feeds in all the data sources.
export default createContainer(() => {

  const handle = Meteor.subscribe('top.gross.income');
  const loading = !handle.ready();
  const result = topGrossIncomeQuery().fetch()[0];
  const resultExists = !loading && !!result;

  return {
    loading,
    resultExists,
    result: resultExists ? result : []
  };
}, TopGrossIncome);
