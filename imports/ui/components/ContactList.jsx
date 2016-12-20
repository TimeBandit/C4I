import React from 'react'
import ContactItemMobile from './ContactItemMobile'
import ContactItemFax from './ContactItemFax'
import ContactItemMail from './ContactItemMail'
import ContactItemLinkify from './ContactItemLinkify'

const ContactList = ({ PublicTelephoneNumber, PublicFaxNumber, EmailAddress, WebsiteAddress }) => {

  if ((!PublicTelephoneNumber)&&(!PublicFaxNumber)&&(!EmailAddress)&&(!WebsiteAddress)) {
    console.log('there is nooo adress')
    return (
        <span></span>
      )
  } 

  return (
    <div className="column">
      <div className="ui segment">
    		<div className="ui list">
    			{PublicTelephoneNumber ? <ContactItemMobile PublicTelephoneNumber={PublicTelephoneNumber}/> : ""}
          {PublicFaxNumber ? <ContactItemFax PublicFaxNumber={PublicFaxNumber}/> : ""}
    			{EmailAddress ? <ContactItemMail EmailAddress={EmailAddress}/> : ""}
    			{WebsiteAddress ? <ContactItemLinkify WebsiteAddress={WebsiteAddress}/> : ""}
    		</div>      
      </div>
    </div>
  );
}

export default ContactList;

