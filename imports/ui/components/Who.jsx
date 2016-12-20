import React from 'react'

const Who = ({ data }) => {

  function WhoList(props) {

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
        Who We Serve
      </h3>
      <div className="ui attached segment">
        <WhoList address={data}>
          {(line, index) => <div className="item" key={index}>{line}</div>}
        </WhoList>
      </div>
    </div>
  );
}

export default Who;
// {buildAddress()}
