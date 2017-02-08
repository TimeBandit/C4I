import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Charities from '../../../api/charities/charities';
import { topEmployeesQuery } from '../../../api/charities/queries'
import TopEmployeesList from '../../components/HomePage/TopEmployeesList'

// returns the top ten
export default createContainer(() => {
  return {
  };
}, TopEmployeesList);
