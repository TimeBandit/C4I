import { Meteor } from 'meteor/meteor';
import { SubsCache } from 'meteor/ccorcos:subs-cache';

import { CharityList } from '../../api/charities/client/CharityList'
import { createContainer } from 'meteor/react-meteor-data';
import SearchPage from '../pages/SearchPage'
// SearchPage
let subsCache = new SubsCache(5, 10);
console.log(subsCache)
export default createContainer(() => {
  const handle = subsCache.subscribe('charity.list');
  const loading = !subsCache.onReady();
  const res = CharityList.find({}).fetch();
  const resultExists = !loading && !!res;
  return {
    loading,
    resultExists,
    result: resultExists ? res : []
  };
}, SearchPage);
