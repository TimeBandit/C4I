import { Meteor } from 'meteor/meteor';
import { Charities } from '../../api/charities/charities'
import { createContainer } from 'meteor/react-meteor-data';
import CharityPage from '../pages/CharityPage'
import { topGrossIncomeQuery } from '../../api/charities/queries';

// creates a container around the app componenet
// & feeds in all the data sources
export default createContainer(() => {

  const registeredCharityNumber = parseInt(this.props.params.registeredCharityNumber);

  const subscriptionHandle = Meteor.subscribe('current.charity', registeredCharityNumber,
    function onStop(val) {
      console.log('onStop');
      console.log(val);
    },
    function onReady(val2) {
      console.log('onReady');
      console.log(arguments);
    });

  const loading = !subscriptionHandle.ready();

  // console.log(`container`);
  // console.log(subscriptionHandle);
  // console.log(loading);
  // console.log('===')

  return {
    subscriptionHandle,
    loading,
    val: topGrossIncomeQuery.fetch()[0]
  };
}, CharityPage);
