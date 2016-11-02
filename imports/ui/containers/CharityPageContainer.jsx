import { Meteor } from 'meteor/meteor';
import { Charities } from '../../api/charities/charities'
import { createContainer } from 'meteor/react-meteor-data';
import CharityPage from '../pages/CharityPage'
import { currentCharity } from '../../api/charities/queries';

// creates a container around the app componenet
// & feeds in all the data sources
export default createContainer(( { params: { registeredCharityNumber }} ) => {

  const charNum = parseInt(registeredCharityNumber);

  const subscriptionHandle = Meteor.subscribe('current.charity', charNum,
    function onStop(val) {
      console.log('onStop');
      console.log(val);
    },
    function onReady(val2) {
      console.log('onReady');
      console.log(arguments);
    });

  const loading = !subscriptionHandle.ready();

  return {
    subscriptionHandle,
    loading,
    charData: currentCharity(charNum).fetch()[0]
  };
}, CharityPage);
