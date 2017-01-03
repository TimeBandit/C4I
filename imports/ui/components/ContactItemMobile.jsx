import React from 'react'

const ContactItemMobile = ({ PublicTelephoneNumber }) => {

  return (
		<div className="item">
			<i className="class mobile icon"></i>
			<div className="content">{PublicTelephoneNumber}</div>
		</div>
  );
}

export default ContactItemMobile;