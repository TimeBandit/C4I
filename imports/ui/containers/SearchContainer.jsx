import { Meteor } from 'meteor/meteor';
import { Charities } from '../../api/charities/charities'
import { createContainer } from 'meteor/react-meteor-data';
import { searchContent } from '../../api/charities/queries'
import Search from '../components/Search'
// creates a container around the app componenet
export default createContainer(() => {
	const handle = Meteor.subscribe('search.data');
  const loading = !handle.ready();
  const result = searchContent.fetch();
  const resultExists = !loading && !!result;
  return {
  	loading,
    resultExists,
    result: resultExists ? result : []
  };
}, Search);
