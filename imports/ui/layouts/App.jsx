/*jshint esversion: 6 */

// libs
import React from 'react';
// import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

// css
// import "picnic/picnic.min.css";
// import './App.less';

// components..
import Menu from "../components/Menu.jsx";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <span>
                <Menu />
                <div id="panel">
                    <section id="banner">
                        <div className="wrapper">
                            <header>
                                <nav id="fixed-header">                    
                                    <button className="toggle-button">☰</button>
                                    <span>charities4islam.co.uk</span>
                                </nav>
                                <article className="hero">
                                    <button className="ui small container blue button">Default</button>
                                    <h1 className="page-title">
                                        charities4islam.co.uk
                                        <p className="page-slogan">Bringing clarity to the ummah</p>
                                    </h1>
                                    
                                    <p className="page-purpose">
                                        Find out all there is to know about your local 
                                        Islamic charity. From accounts, to trustees to 
                                        contact details, you'll find it here.
                                    </p>
                                </article>                
                            </header>
                        </div>
                    </section>
                    <main id="content">
                        <div className="wrapper">
                            {this.props.children}
                            <section className="content flex one">
                                <div className="full">
                                    <article className="card">
                                        <footer id="footer">
                                                This website and its content is copyright of CHARITIES4ISLAM.org 2016. All rights reserved.
                                        </footer>
                                    </article>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </span>            
        );
    }
}