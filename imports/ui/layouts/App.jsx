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
                    <p className="slogan">Bringing clarity to the ummah</p>
                </div>  
            </header>
            <section className="content flex three">
                <div><span>1</span></div>
                <div><span>2</span></div>
                <div><span>3</span></div>
                <div><span>4</span></div>
                <div><span>5</span></div>
                <div><span>6</span></div>
            </section>
        </div>
    </span>
)

export default App;
