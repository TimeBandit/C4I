// modules
import React from 'react';
import { $ } from 'meteor/jquery';
import { Link } from 'react-router';
// import slideOut from "/imports/ui/helpers/slideOut.js";
// css
export default class Menu extends React.Component {
  componentDidMount() {
    // $(slideOut());
    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item');
  }

  render() {
    return (
      <nav id="menu" className="sideBar">
        <div className="ui vertical inverted sidebar menu">
          <Link to="/">
            <a className="active item">Home</a>
          </Link>
          <Link to="about">
            <a className="item">About</a>
          </Link>
          <Link to="contact">
            <a className="item">Contact</a>
          </Link>
        </div>
      </nav>
    );
  }
}
