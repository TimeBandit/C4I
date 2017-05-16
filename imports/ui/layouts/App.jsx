import React from 'react';
import { Link } from 'react-router';
import { NavLink, IndexLink } from 'react-router-dom';
// import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
// css
import './App.less';

// components..
import NavMenu from '../components/NavMenu'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    $(document)
      .ready(function() {
        // create sidebar and attach to menu open
        $('.ui.sidebar')
          .sidebar('attach events', '.toc.item');
      });
  }

  componentWillUnmount() {
    $('.ui.sidebar').remove();
  }

  render() {

    return (
      <span>
        <div className="ui vertical basic segment menu-segment">
            <div className="ui container">
                <nav className="ui large inverted borderless menu">
                    {/*<Link className="item" to="/">Home</Link>
                        <Link className="item" to="/about">About</Link>
                        <Link className="item" to="/search">Search</Link>
                        <Link className="item" to="/contact">Contact</Link>*/}
                    <a id="mini-title" className="toc item">
                                islamiccharities.org.uk
                            </a>
                    <a id="burger" className="toc right item">
                        <i className="white sidebar big icon"></i>
                    </a>
                </nav>
            </div>
        </div>
        {this.props.children}
        <div className="ui inverted vertical footer segment">
            <div className="ui container">
                <div className="ui stackable inverted divided equal height stackable grid">
                    <div className="three wide column">
                        <h4 className="ui inverted header">🌙</h4>
                        <div className="ui inverted link list">
                            <Link className="item" to="/">Home</Link>
                            <Link className="item" to="/about">About</Link>
                            <Link className="item" to="/search">Search</Link>
                            <Link className="item" to="/contact">Contact</Link>
                        </div>
                    </div>
                    <div className="seven wide column">
                        <div id="mc_embed_signup" style={{ clear: "left"}}>
                            <form action="//islamiccharities.us15.list-manage.com/subscribe/post?u=ad50935f54185f564616bf36c&amp;id=e6ccff54c8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="ui form validate" target="_blank" noValidate>
                                <div id="mc_embed_signup_scroll">
                                    <label htmlFor="mce-EMAIL">Subscribe to our mailing list</label>
                                    <input type="email" defaultValue="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
                                    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                                        <input type="text" name="b_ad50935f54185f564616bf36c_e6ccff54c8" tabIndex="-1" value="" />
                                    </div>
                                    <div className="clear">
                                        <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="ui button" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </span>
    );
  }
};
