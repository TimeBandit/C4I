import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import '../imports/startup/client/fixtures.jsx';

Meteor.startup(() => {
  console.log('Starting UI...');
  render(renderRoutes(), document.getElementById('app'));
  // capture sidebar items
  $(function() {
    let $items = $('.sidebar');
    // attach event handler to each
    $items.on('click', function(e) {
      e.preventDefault();
      console.log(e.target.pathname);
      browserHistory.push(e.target.pathname);
      $('.ui.sidebar').sidebar('toggle');
    });
  })
});
