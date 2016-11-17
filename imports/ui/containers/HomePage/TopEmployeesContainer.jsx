import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Charities from '../../../api/charities/charities';
import { topEmployeesQuery } from '../../../api/charities/queries'
import TopEmployeesList from '../../components/HomePage/TopEmployeesList'

// returns the top ten
export default createContainer(() => {
  const handle = Meteor.subscribe('top.employees');
  const loading = !handle.ready();
  const result = topEmployeesQuery.fetch();
  const resultExists = !loading && !!result;

  return {
    loading,
    resultExists,
    result: resultExists ? result : []
  };
}, TopEmployeesList);
