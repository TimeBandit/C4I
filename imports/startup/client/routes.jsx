// import ;
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// layout
import App from '/imports/ui/layouts/App.jsx';
// import AppContainer from '/imports/ui/containers/AppContainer.jsx';
// 
// route components
import HomePage from '/imports/ui/pages/HomePage.jsx';
import AboutPage from '/imports/ui/pages/AboutPage.jsx';
import SearchPage from '/imports/ui/pages/SearchPage.jsx';
import ContactPage from '/imports/ui/pages/ContactPage.jsx';
import MyFavouritesPage from '/imports/ui/pages/MyFavouritesPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={HomePage} />
    	<Route path="/about" component={AboutPage} />
    	<Route path="/search" component={SearchPage} />
    	<Route path="/contact" component={ContactPage} />
    	<Route path="/myfavourites" component={MyFavouritesPage} />
    </Route>
  </Router>
);