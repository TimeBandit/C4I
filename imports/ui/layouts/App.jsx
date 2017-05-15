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
                qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
                    <div className="three wide column">
                        <h4 className="ui inverted header">🌙</h4>
                        <div className="ui inverted link list">
                            <Link className="item" to="/">Homeyy</Link>
                            <Link className="item" to="/about">About</Link>
                            <Link className="item" to="/search">Search</Link>
                            <Link className="item" to="/contact">Contact</Link>
                        </div>
                    </div>
                    <div className="three wide computer tablet only column">
                        <h4 className="ui inverted header">Advertise Herexx</h4>
                        <div className="ui inverted link list">
                        </div>
                    </div>
                    <div className="seven wide computer tablet only column">
                        <h4 className="ui inverted header">Signup</h4>
                        <div id="mc_embed_signup" style={{ background: "#fff", clear: "left", font: "14px Helvetica, Arial, sans-serif"}}>
                            <form action="//islamiccharities.us15.list-manage.com/subscribe/post?u=ad50935f54185f564616bf36c&amp;id=e6ccff54c8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
                                <div id="mc_embed_signup_scroll">
                                    <label htmlFor="mce-EMAIL">Subscribe to our mailing list</label>
                                    <input type="email" value="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
                                    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                                        <input type="text" name="b_ad50935f54185f564616bf36c_e6ccff54c8" tabindex="-1" value="" />
                                    </div>
                                    <div className="clear">
                                        <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="three wide mobile only column">
                        <h4 className="ui inverted header">Advertise Hereyy</h4>
                    </div>
                    <div className="seven wide mobile only column">
                        
                    </div>
                </div>
            </div>
        </div>
      </span>
    );
  }
};
