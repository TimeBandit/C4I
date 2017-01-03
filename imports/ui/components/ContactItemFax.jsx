import React from 'react'
import { adressObjToURI, parseAdressObject } from '../helpers/helpers'

const ContactItemFax = ({ PublicFaxNumber }) => {

	// if (PublicFaxNumber === "") {
	// 	console.log('no fax number');
	// 	return
	// };

  return (
    <div className="item">
      <i className="class fax icon"></i>
      <div className="content">{PublicFaxNumber}</div>
    </div>
  );
}

export default ContactItemFax;
