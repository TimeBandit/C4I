import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';
import '../imports/startup/client/fixtures.jsx';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});