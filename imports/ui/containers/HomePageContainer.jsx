import { Meteor } from 'meteor/meteor';
import { Charities } from '../../api/charities/charities'
import { createContainer } from 'meteor/react-meteor-data';
import HomePage from '../pages/HomePage';

// creates a container around the app componenet
// & feeds in all the data sources
export default createContainer(() => {

  const maxGrossIncomeHandle = Meteor.subscribe('max.gross.income');
  const loading = !maxGrossIncomeHandle.ready();
  const maxGrossIncomeCharity = Charities.find({}).fetch()[0];
  console.log(`inside the container`);

  return {
    maxGrossIncomeHandle,
    loading,
    maxGrossIncomeCharity
  };
}, HomePage);
