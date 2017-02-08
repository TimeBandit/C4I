import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Charities from '../../../api/charities/charities';
import { topVolunteersQuery } from '../../../api/charities/queries'
import TopVolunteersList from '../../components/HomePage/TopVolunteersList'

// returns the top ten
export default createContainer(() => {
  return {
  };
}, TopVolunteersList);
