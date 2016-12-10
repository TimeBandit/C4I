import React from 'react'
import { adressObjToURI, parseAdressObject } from '../helpers/helpers'

const GoogleMap = ({ contactData }) => {

  const { Address, PublicTelephoneNumber, PublicFaxNumber, EmailAddress, WebsiteAddress } = contactData;
  // console.log(Address));

  const buildAddress = () => {
  	// return Adress;
    let res = "";
    for (let key in Address) {
      if (Address[key]) {
        res += (Address[key] + ', ');
      }
    }
    // console.log(res);
    // remove final comma
    return res.slice(0, -2);

  };

  return (
    <div className="ui card">
  		<div className="content">
  			<div className="header">Contact Info</div>
  		</div>
  		<div className="content">
  			<div className="ui list">
  				<div className="item">
  					<i className="class marker icon"></i>
  					<div className="content">{buildAddress()}</div>
  				</div>
  				<div className="item">
  					<i className="class mobile icon"></i>
  					<div className="content">{PublicTelephoneNumber}</div>
  				</div>
  				<div className="item">
  					<i className="class fax icon"></i>
  					<div className="content">{PublicFaxNumber}</div>
  				</div>
  				<div className="item">
  					<i className="class mail icon"></i>
  					<div className="content">
  						<a href={"mailto:"+ EmailAddress}>{EmailAddress}</a>
  					</div>
  				</div>
  				<div className="item">
  					<i className="class linkify icon"></i>
  					<div className="content">
  						<a href={WebsiteAddress}>{WebsiteAddress}</a>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  );
}

export default GoogleMap;
