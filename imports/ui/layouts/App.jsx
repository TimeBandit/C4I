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
            <header>
                <nav id="fixed-header" className="nav">                    
                        <button className="toggle-button">☰</button>
                        <span>charities4islam.co.uk</span>
                </nav>
                <div className="title">
                    <div className="heading"><h1>charities4islam.co.uk</h1></div>
                    <h3 className="slogan">Bringing clarity to patrons of UK based Islamic charities</h3>
                </div>  
            </header>
            <section className="content">
                <article class="card">
                  <header>
                    <button>Love</button>
                    <button class="dangerous">Hate</button>
                  </header>
                </article>
            </section>
        </div>
    </span>
)

export default App;
