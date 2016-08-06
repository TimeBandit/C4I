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
                    <section className="content flex one three-600">
                        <div className="full third-600">
                            <article className="card intro">
                                <div className="stat">
                                    <div className="value"></div>
                                    <div className="label"></div>
                                </div>
                                <img src="/img/svgicons/dollar-symbol.svg"/>
                                <footer>
                                    <h3>Islamic Relief</h3>
                                    <button className="more-btn">See More</button>
                                </footer>
                            </article>
                        </div>
                        <div className="full third-600">
                            <article className="card info">
                                <img src="/img/svgicons/thumbs-up-hand-symbol.svg"/>
                                <footer>
                                    <h3>Islamic Relief</h3>
                                    <button className="more-btn">See More</button>
                                </footer>
                            </article>
                        </div>
                        <div className="full third-600">
                            <article className="card info">
                                <img src="/img/svgicons/eye-open.svg"/>
                                <footer>
                                    <h3>Islamic Relief</h3>
                                    <button className="more-btn">See More</button>
                                </footer>
                            </article>
                        </div>
                    </section>                
                </div>
                <footer id="footer">
                    <div className="wrapper">
                        footer will go here
                    </div>
                </footer>
            </main>
        </div>
    </span>
)

export default App;
