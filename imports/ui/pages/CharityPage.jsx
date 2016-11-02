import React from 'react'
import GoogleMap from '../components/GoogleMap'
import ContactCard from '../components/ContactCard';

export default class CharityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { charData, loading } = this.props;

    return (
      <div className="ui grid container">
      	<div className="column row">
      		<h1  className="ui header" >
	        	{ charData === undefined ? "" : charData.CharityName}
	        	<div className="sub header">{ charData === undefined ? "" : charData.Activities }</div>
	        </h1>
      	</div>
      	<div className="doubling two column row">
      		<div className="column">
      			{ charData === undefined ? "" : <GoogleMap adressObj={charData.Address}/>}
      		</div>
      		<div className="column">
      			{ charData === undefined ? "" : <ContactCard contactData={charData}/>}
      		</div>
      	</div>
      </div>
    )
  }
}