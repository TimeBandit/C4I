import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Charities from '../../../api/charities/charities';
import { topTotalExpenditureQuery } from '../../../api/charities/queries'
import TopTotalExpenditureList from '../../components/HomePage/TopTotalExpenditureList'

// returns the top ten
export default createContainer(() => {
  const handle = Meteor.subscribe('top.total.expenditure');
  const loading = !handle.ready();
  const result = topTotalExpenditureQuery.fetch();
  const resultExists = !loading && !!result;

  return {
    loading,
    resultExists,
    result: resultExists ? result : []
  };
}, TopTotalExpenditureList);
