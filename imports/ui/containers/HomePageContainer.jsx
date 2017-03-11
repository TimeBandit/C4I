import { Meteor } from 'meteor/meteor';
import { Charities } from '../../api/charities/charities'
import { createContainer } from 'meteor/react-meteor-data';
import HomePage from '../pages/HomePage'
// import { CumulativeStats } from '../../api/stats/client/cumulativeStats'

// creates a container around the app componenet
export default createContainer(() => {
	// const handle = Meteor.subscribe('cumulative.stats');
 //  const loading = !handle.ready();
 //  const result = CumulativeStats.findOne({});
 //  const resultExists = !loading && !!result;
  return {
  	// loading,
   //  resultExists,
   //  result: resultExists ? result : []
  };
}, HomePage);
