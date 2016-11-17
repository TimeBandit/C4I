import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Charities from '../../../api/charities/charities';
import { topVolunteersQuery } from '../../../api/charities/queries'
import TopVolunteersList from '../../components/HomePage/TopVolunteersList'

// returns the top ten
export default createContainer(() => {
  const handle = Meteor.subscribe('top.volunteers');
  const loading = !handle.ready();
  const result = topVolunteersQuery.fetch();
  const resultExists = !loading && !!result;

  return {
    loading,
    resultExists,
    result: resultExists ? result : []
  };
}, TopVolunteersList);
