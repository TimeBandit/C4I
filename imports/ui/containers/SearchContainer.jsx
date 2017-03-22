import { Meteor } from 'meteor/meteor';
// import { Charities } from '../../api/charities/charities'
import { CharityList } from '../../api/charities/client/CharityList'
import { createContainer } from 'meteor/react-meteor-data';
// import { searchContent } from '../../api/charities/queries'
// import SearchPage from '../components/Search'
import SearchPage from '../pages/SearchPage'
// SearchPage
// creates a container around the app componenet
export default createContainer(() => {
	const handle = Meteor.subscribe('charity.list');
  const loading = !handle.ready();
  const res = CharityList.find({}).fetch();
  const resultExists = !loading && !!res;
  return {
  	loading,
    resultExists,
    result: resultExists ? res : []
  };
}, SearchPage);
