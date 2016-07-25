// modules
import React from 'react';
import { $ } from 'meteor/jquery';
import slideOut from "/imports/ui/helpers/slideOut.js";

// css
import './Menu.less';

export default class Menu extends React.Component {
    componentDidMount() {
        $(slideOut());
    }

    render() {
        return (
            <nav id="menu" className="sideBar">
				<div className="sideBar__section">
					<div>
					  <label className="stack">
					    <input name="stack" type="radio"/>
					    <span className="button toggle">
					      <i className="fa fa-home fa-fw" aria-hidden="true"></i>&nbsp; Home
					    </span>
					  </label>
					  <label className="stack">
					    <input name="stack" type="radio"/>
					    <span className="button toggle">
					      <i className="fa fa-search " aria-hidden="true"></i>&nbsp; Search
					    </span>
					  </label>
					  <label className="stack">
					    <input name="stack" type="radio"/>
					    <span className="button toggle">
					      <i className="fa fa-star" aria-hidden="true"></i>&nbsp; Favourites
					    </span>
					  </label>
					  <label className="stack">
					    <input name="stack" type="radio"/>
					    <span className="button toggle">
					      <i className="fa fa-book" aria-hidden="true"></i>&nbsp; About
					    </span>
					  </label>
					  <label className="stack">
					    <input name="stack" type="radio"/>
					    <span className="button toggle">
					      <i className="fa fa-envelope" aria-hidden="true"></i>&nbsp; Contact
					    </span>
					  </label>
					</div>
				</div>
				<div className="sideBar__section">
					<label className="stack">
					    <input name="stack" type="radio"/>
					    <span className="button toggle">
					      <i className="fa fa-facebook-official" aria-hidden="true"></i>&nbsp; Facebook
					    </span>
					  </label>
					  <label className="stack">
					    <input name="stack" type="radio"/>
					    <span className="button toggle">
					      <i className="fa fa-twitter" aria-hidden="true"></i>&nbsp; Twitter
					    </span>
					  </label>
				</div>
		    </nav>
        );
    }
}

export default Menu;