import React from 'react';

const Loader = ({ message }) => {
  return (
    <div className="container">
      <div className="ui segment" style={{height: "50vh"}}>
        <div className="ui active inverted dimmer">
          <div className="ui text loader">{message}</div>
        </div>
        <p></p>
      </div>
    </div>
  )
};

export default Loader;