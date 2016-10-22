// modules
import React from 'react';
import { $ } from 'meteor/jquery';
import { Link } from 'react-router';
// import slideOut from "/imports/ui/helpers/slideOut.js";
// css
export default class SidebarMenu extends React.Component {
  componentDidMount() {
    // $(slideOut());
    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item');
  }

  render() {
    return (
      <nav id="menu">
        <div className="ui vertical inverted sidebar menu">
          <Link to="/">
            Home
          </Link>
          <Link to="about">
            About
          </Link>
          <Link to="contact">
            Contact
          </Link>
        </div>
      </nav>
    );
  }
}
