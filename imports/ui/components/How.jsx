import React from 'react'

const How = ({ data }) => {

  function HowList(props) {

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
        How We Serve
      </h3>
      <div className="ui attached segment">
        <HowList address={data}>
          {(line, index) => <div className="item" key={index}>{line}</div>}
        </HowList>
      </div>
    </div>
  );
}

export default How;
// {buildAddress()}