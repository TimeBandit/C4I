import React from 'react'
import { adressObjToURI, parseAdressObject } from '../helpers/helpers'

const ContactItemLinkify = ({ WebsiteAddress }) => {

  return (
    <div className="item">
      <i className="class linkify icon"></i>
      <a className="content" href={WebsiteAddress}>{WebsiteAddress}</a>
    </div>
  );
}

export default ContactItemLinkify;
