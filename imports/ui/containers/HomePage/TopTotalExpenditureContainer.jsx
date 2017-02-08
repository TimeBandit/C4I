import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Charities from '../../../api/charities/charities';
import { topTotalExpenditureQuery } from '../../../api/charities/queries'
import TopTotalExpenditureList from '../../components/HomePage/TopTotalExpenditureList'

// returns the top ten
export default createContainer(() => {
  return {
  };
}, TopTotalExpenditureList);
