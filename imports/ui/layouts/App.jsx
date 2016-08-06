// libs
import React from 'react';
import { Meteor } from 'meteor/meteor';

// css
import "picnic/picnic.min.css";
import './App.less';

// components
import Menu from "../components/Menu.jsx";

const App = (props) => (
    <span>
        <Menu />
        <div id="panel">
            <section id="banner">
                <div className="wrapper">
                    <header>
                        <nav id="fixed-header">                    
                                <span>charities4islam.co.uk</span>
                        </nav>
                        <button className="toggle-button">☰</button>
                        <article className="hero">
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
                    <section className="content flex one three-600 four-1000">
                        <div className="full third-600 fourth-1000">
                            <article className="card">
                                <img src="/img/svgicons/dollar-symbol.svg"/>
                                <div className="stat">
                                    <div className="value">1.2 M</div>
                                    <div className="text">Riches Charity</div>
                                </div>
                                <footer>
                                    <h3>Islamic Relief</h3>
                                    <button className="more-btn">See More</button>
                                </footer>
                            </article>
                        </div>
                        <div className="full third-600 fourth-1000">
                            <article className="card">
                                <img src="/img/svgicons/thumbs-up-hand-symbol.svg"/>
                                <div className="stat">
                                    <div className="value">600</div>
                                    <div className="text">Most Favourite</div>
                                </div>
                                <footer>
                                    <h3>Islamic Relief</h3>
                                    <button className="more-btn">See More</button>
                                </footer>
                            </article>
                        </div>
                        <div className="full third-600 fourth-1000">
                            <article className="card">
                                <img src="/img/svgicons/eye-open.svg"/>
                                <div className="stat">
                                    <div className="value">24 K</div>
                                    <div className="text">Most Page View</div>
                                </div>
                                <footer>
                                    <h3>Islamic Relief</h3>
                                    <button className="more-btn">See More</button>
                                </footer>
                            </article>
                        </div>
                        <div className="full third-600 fourth-1000">
                            <article className="card">
                                <img src="/img/svgicons/tint-drop.svg"/>
                                <div className="stat">
                                    <div className="value">70p/1£</div>
                                    <div className="text">Most Efficient</div>
                                </div>
                                <footer>
                                    <h3>Islamic Relief</h3>
                                    <button className="more-btn">See More</button>
                                </footer>
                            </article>
                        </div>
                        <div className="full third-600 fourth-1000">
                            <article className="card">
                                <img src="/img/svgicons/user-shape.svg"/>
                                <div className="stat">
                                    <div className="value">196</div>
                                    <div className="text">Most Employees</div>
                                </div>
                                <footer>
                                    <h3>Islamic Relief</h3>
                                    <button className="more-btn">See More</button>
                                </footer>
                            </article>
                        </div>
                    </section>
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
)

export default App;
