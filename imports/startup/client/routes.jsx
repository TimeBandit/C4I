// import ;
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
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
    <div className="ui vertical basic segment menu-segment">
    'bla bla bla'
      <div className="ui container">
          <nav className="ui large inverted borderless menu">
              <NavLink activeClassName="active" className="item" to="/">Home</NavLink>
              <NavLink activeClassName="active" className="item" to="/about">About</NavLink>
              <NavLink activeClassName="active" className="item" to="/search">Search</NavLink>
              <NavLink activeClassName="active" className="item" to="/contact">Contact</NavLink>
              {/*<a className="active item">Home</a>
                                  <a className="item">About</a>
                                  <a className="item">Search</a>
                                  <a className="item">Contact</a>*/}
              <a className="toc item mini-title">
                          Islamic Charity Book
                      </a>
              <a className="toc right item">
                  <i className="white sidebar big icon"></i>
              </a>
          </nav>
      </div>
    </div>
    <Route path="/" component={App}>
      <IndexRoute component={HomePageContainer} />
      <Route path="/about" component={AboutPage} />
      <Route path="/search" component={SearchContainer} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/thankyou" component={ThankYou} />
      <Route path="/charity/:registeredCharityNumber" component={CharityPageContainer} />
      {/*<Route path="/myfavourites" component={MyFavouritesPage} />
            <Route path="/legal" component={LegalPage} />*/}
      {/*<Route path="*" component={NotFoundPage}/>*/}
    </Route>
  </Router>
);
