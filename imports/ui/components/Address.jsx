import React from 'react'

const AddressItem = ({ data }) => {

  function Address(props) {

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
      <div className="ui segment">
        <Address address={data}>
          {(line, index)=><div className="item" key={index}>{line}</div>}
        </Address>
      </div>
    </div>
  );
}

export default AddressItem;
// {buildAddress()}
