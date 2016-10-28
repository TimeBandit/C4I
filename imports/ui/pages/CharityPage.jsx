import React from 'react';

export default class CharityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>{this.props.params.registeredCharityNumber}</h2>
      </div>
    )
  }
}

