import React from 'react'

const What = ({ data }) => {

  function WhatList(props) {

    let items = [];
    const lines = Object.values(props.address);

    lines.forEach(function(line, index, arr) {
      if (line) {
        items.push(props.children(line, index))

      }
    });

    return <div className="ui list">{items}</div>
  }

  return (
    <div className="column">
      <h3 className="ui top attached header">
        What We Provide
      </h3>
      <div className="ui attached segment">
        <WhatList address={data}>
          {(line, index) => <div className="item" key={index}>{line}</div>}
        </WhatList>
      </div>
    </div>
  );
}

export default What;
// {buildAddress()}
