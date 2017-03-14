import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
const List = require('list.js')();
export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  componentWillMount() {
    const self = this;
    Meteor.call('searchTableData', function(error, result) {
      console.log('method call ', result);
      if (result) {
        self.setState({ charities: result });
      }
    });
  };

  componentWillUnmount() {

  };

  render() {
  	console.log(List);
    return (
    	<div className="ui vertical segment">
	    	<div className="ui container">
		      <div className="ui cards">
					  <div className="grey card">
					    <div className="content">
					      <div className="header">AMANAT CHARITY TRUST</div>
					      <div className="meta">Location: Birmingham</div>
					      <div className="description">
					        <div className="ui labels">
									  <a className="ui label">
									    Employees
									    <div className="detail">52</div>
									  </a>
									  <a className="ui label">
									    Incoming
									    <div className="detail">£24.91m</div>
									  </a>
									</div>
					      </div>
					    </div>
					    <div className="extra content">
					    	Established: 07/11/1990
					    </div>
					  </div>
					  <div className="green card">
					    <div className="content">
					      <div className="header">UMMAH HELP</div>
					      <div className="meta">Location: Birmingham</div>
					      <div className="description">
					      	<div className="ui labels">
									  <a className="ui label">
									    Employees
									    <div className="detail">10</div>
									  </a>
									  <a className="ui label">
									    Incoming
									    <div className="detail">£763k</div>
									  </a>
									</div>
					      </div>
					    </div>
					    <div className="extra content">
					    	Established: 04/07/2011
					    </div>
					  </div>
					  <div className="green card">
					    <div className="content">
					      <div className="header">SWANSEA MOSQUE AND ISLAMIC COMMUNITY CENTRE</div>
					      <div className="meta">Location: Swansea</div>
					      <div className="description">
					      	<div className="ui labels">
									  <a className="ui label">
									    Employees
									    <div className="detail">13</div>
									  </a>
									  <a className="ui label">
									    Incoming
									    <div className="detail">£523k</div>
									  </a>
									</div>
					      </div>
					    </div>
					    <div className="extra content">
					    	Established: 06/08/2004
					    </div>
					  </div>
					</div>
	    	</div>
    	</div>
    );
  }
};