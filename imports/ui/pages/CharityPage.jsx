import React from 'react';

export default class CharityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { charData, loading } = this.props;

    return (
      <span>
      	<ui className="ui container">
	      	<div className="ui vertical segment">
		        <h1  className="ui header" >
		        	{ charData === undefined ? "" : charData.CharityName}
		        	<div className="sub header">{ charData === undefined ? "" : charData.Activities }</div>
		        </h1>
					</div>
					<div className="ui vertical segment">
					  <p></p>
					</div>
					<div className="ui vertical segment">
					  <p></p>
					</div>
      	</ui>
      </span>
    )
  }
}
