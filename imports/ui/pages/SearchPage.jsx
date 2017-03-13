import React from 'react';
import { Meteor } from 'meteor/meteor';

const SearchPage = () => {
  Meteor.call('searchTableData', function(error, result) {
    console.log('method call ', result);
    // console.log(result);
  });
  return (
    <p>
  	SearchPage
  </p>
  )
};

export default SearchPage;
