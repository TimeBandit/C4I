import React from 'react'
import GoogleMap from '../components/GoogleMap'
import ContactCard from '../components/ContactCard'
import FinancialFacts from '../components/FinancialFacts'
import Trustees from '../components/Trustees';

export default class CharityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { charData, loading } = this.props;
		if (charData) {
			// console.log(charData.Trustees);
			
		}

    return (
			<ui className="ui stackable container grid">
					<div className="sixteen wide column">
						<div className="ui padded segment">
							<h1  className="ui header" >
						  	{ charData === undefined ? "" : charData.CharityName}
						  	<div className="sub header">{ charData === undefined ? "" : charData.Activities }</div>
						  </h1>
						</div>
					</div>
					<div className="ten wide column">
						{ charData === undefined ? "" : <GoogleMap adressObj={charData.Address}/>}
					</div>
					<div className="six wide column">
						{ charData === undefined ? "" : <ContactCard contactData={charData}/>}
					
					</div>
					<div className="sixteen wide centered column">
						<h2 className="ui header">Fixed & Figures</h2>
						{ charData === undefined ? "" : <FinancialFacts financialData={charData}/>}	
					</div>
					<h2 className="ui header">Trustees</h2>
					{ charData === undefined ? "" : <Trustees trusteesData={charData.Trustees}/>}	
			</ui>      
    )
  }
}