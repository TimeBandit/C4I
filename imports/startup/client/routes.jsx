// import ;
import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

// layout
// keep file extension
import App from '../../ui/layouts/App.jsx'
// import AppContainer from '/imports/ui/containers/AppContainer.jsx';
// 
// route components
// import HomePage from '../../ui/pages/HomePage'
import AboutPage from '../../ui/pages/AboutPage'
import SearchPage from '../../ui/pages/SearchPage'
import SearchContainer from '../../ui/containers/SearchContainer'
import ContactPage from '../../ui/pages/ContactPage'
import LegalPage from '../../ui/pages/LegalPage'
import MyFavouritesPage from '../../ui/pages/MyFavouritesPage'
import HomePageContainer from '../../ui/containers/HomePageContainer'
import CharityPageContainer from '../../ui/containers/CharityPageContainer'
import ThankYou from '../../ui/pages/ThankYou'

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePageContainer} />
      <Route path="charity/:registeredCharityNumber" component={CharityPageContainer} />
      <Route path="about" component={AboutPage} />
      <Route path="contact" component={ContactPage} />
      <Route path="thankyou" component={ThankYou} />
      <Route path="search" component={SearchContainer} />
    </Route>
  </Router>
);
