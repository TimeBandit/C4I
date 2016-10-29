import React from 'react';

export default class CharityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { charData, loading } = this.props;

    return (
      <div>
        <h2>{ charData === undefined ? "" : charData.CharityName}</h2>
      </div>
    )
  }
}
