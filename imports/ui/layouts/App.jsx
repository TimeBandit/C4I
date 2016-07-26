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
                {/*<div className="top-bar">
                                    <button className="toggle-button tooltip-right" data-tooltip="Press for Menu">☰</button>
                                    <div className="updated">updated: yesterday</div>
                                </div>*/}
                <nav className="nav">
                    
                        <button className="toggle-button tooltip-right" data-tooltip="Press for Menu">☰</button>
                        <span>IslamicCharities.org</span>
                </nav>
                <div className="title">
                    <div className="heading"><span>IslamicCharities.org</span></div>
                    <div className="slogan">Bringing clarity to patrons of UK based Islamic charities</div>
                </div>  
            </header>
            <section className="content">
            </section>
        </div>
    </span>
)

export default App;
