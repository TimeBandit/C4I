import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Charities from '../../../api/charities/charities';
import { topGrossIncomeQuery } from '../../../api/charities/queries'
import TopGrossIncomeList from '../../components/HomePage/TopGrossIncomeList'

export default createContainer(() => {
  return {
  };
}, TopGrossIncomeList);
