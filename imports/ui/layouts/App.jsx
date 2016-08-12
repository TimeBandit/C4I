// libs
import React from 'react';
import { Meteor } from 'meteor/meteor';

// css
import "picnic/picnic.min.css";
import './App.less';

// components..
import Menu from "../components/Menu.jsx";

const App = (child) => (
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
                    
                    <section className="content flex one">
                        <div className="full">
                            {child}
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
