import React from 'react'

const ContactItemMail = ({ EmailAddress }) => {

  return (
    <div className="item">
      <i className="class mail icon"></i>
      <a className="content" href={"mailto:"+ EmailAddress}>{EmailAddress}</a>
    </div>
  );
}

export default ContactItemMail;
