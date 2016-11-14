import { Meteor } from 'meteor/meteor';
import { Charities } from '../../api/charities/charities'
import { createContainer } from 'meteor/react-meteor-data';
import HomePage from '../pages/HomePage'

// creates a container around the app componenet
export default createContainer(() => {

  return {
  };
}, HomePage);
