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
                            <h1 className="page-title">charities4islam.co.uk</h1>
                            <p className="page-slogan">Bringing clarity to the ummah</p>
                        </article>                
                    </header>
                </div>
            </section>
            <main id="content">
                <div className="wrapper">
                    <section className="content flex one three-600">
                        <div className="full two-third-600">
                            <article className="card intro">
                                <p>
                                    The aim of this site is to bring clarity to the UK 
                                    ummah by showing visitors how charitable donations are 
                                    collected and spent at Islamic charities across the country. 
                                    To find a charoty click 'Search' from the menu. 
                                    All data is provided by the charities commission.
                                </p>
                            </article>
                        </div>
                        <div className="full third-600">
                            <article className="card info">
                                <header></header>
                                <footer>
                                    <h3>Misty Forest</h3>
                                    <button>Like</button>
                                </footer>
                            </article>
                        </div>
                        <div className="full third-600">
                            <article className="card info">
                                <img src="/web/img/forest.jpg"/>
                                <footer>
                                    <h3>Misty Forest</h3>
                                    <button>Like</button>
                                </footer>
                            </article>
                        </div>
                    </section>                
                </div>
            </main>
            <footer id="footer">
                <div className="wrapper">
                    footer will go here
                </div>
            </footer>
        </div>
    </span>
)

export default App;
