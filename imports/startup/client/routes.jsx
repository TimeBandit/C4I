// import ;
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

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

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePageContainer} />
      <Route path="/about" component={AboutPage} />
      <Route path="/search" component={SearchContainer} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/charity/:registeredCharityNumber" component={CharityPageContainer} />
      {/*<Route path="/myfavourites" component={MyFavouritesPage} />
            <Route path="/legal" component={LegalPage} />*/}
      {/*<Route path="*" component={NotFoundPage}/>*/}
    </Route>
  </Router>
);
