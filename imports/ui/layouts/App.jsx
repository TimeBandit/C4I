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
        <div className="content" id="panel">
            <header>
                <div className="top-bar">
                    <button className="toggle-button">☰</button>
                    <div className="updated">updated: yesterday</div>
                </div>
                <div className="title">
                    <div className="heading">islamiccharities.org</div>
                    <div className="slogan">Bringing clarity to the UK ummah</div>
                </div>  
            </header>
        </div>
    </span>
)

export default App;
