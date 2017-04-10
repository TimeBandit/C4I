import { Meteor } from 'meteor/meteor';
import { Charities } from '../../api/charities/charities'
import { createContainer } from 'meteor/react-meteor-data';
import CharityPage from '../pages/CharityPage'
import { currentCharity } from '../../api/charities/queries';

// creates a container around the app componenet
// & feeds in all the data sources
export default createContainer(({ params: { registeredCharityNumber } }) => {

  const charNum = parseInt(registeredCharityNumber);
  const subscriptionHandle = Meteor.subscribe('current.charity', charNum);
  // console.log('CHARITY OBJECT ',currentCharity(charNum).fetch()[0]);
  const loading = !subscriptionHandle.ready();
  return {
    subscriptionHandle,
    loading,
    charity: currentCharity(charNum).fetch()[0]
  };
}, CharityPage);