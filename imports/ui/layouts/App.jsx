// libs
import React from 'react';
import { Meteor } from 'meteor/meteor';

// css
import "picnic/picnic.min.css";
import './App.less';

// components
import Menu from "../components/Menu";

const App = (props) => (
    <span>
        <Menu />
        <button className="toggle-button">☰</button>
        <div className="content" id="panel">
            <header>                
                <h2>Panel</h2>
            </header>
        </div>
    </span>
)

export default App;
