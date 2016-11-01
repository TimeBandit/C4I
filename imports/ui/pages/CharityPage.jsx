import React from 'react'
import GoogleMap from './GoogleMap';

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
						{ charData === undefined ? "" : <GoogleMap adressObj={charData.Address}/>}					  
					</div>
					<div className="ui vertical segment">
					  <p></p>
					</div>
      	</ui>
      </span>
    )
  }
}

// https://www.google.com/maps/embed/v1/MODE?key=YOUR_API_KEY&parameters

//  AIzaSyCeYDxojDuSv5WoqvAubgzIElDuknExNpI 

//  https://www.google.com/maps/embed/v1/place?key=AIzaSyCeYDxojDuSv5WoqvAubgzIElDuknExNpI&q=Eiffel+Tower,Paris+France

//   var myOtherUrl = 
//        "http://example.com/index.html?url=" + encodeURIComponent(address);