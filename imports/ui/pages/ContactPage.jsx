import React from 'react';
import { Redirect } from 'react-router';
import { browserHistory } from 'react-router';

/*
Server name: smtp-mail.outlook.com
Port: 587
Encryption method: STARTTLS
*/

function sameDay() {
  // console.info('Inside SameDay');
  const currentVal = localStorage.getItem('emailSentDate'),
    today = (new Date().getDate()).toString();

  // console.table({currentVal, today});
  if (currentVal) {
    if (currentVal === today) {
      console.info('its the same day');
      return true;
    }
  }
  console.info('its NOT the same day');
  return false;
};

const ContactPage = () => {
  // ref placeholders
  let name = null,
    email = null,
    message = null;

  function buttonPress(e) {
    console.log(`form elements: ${name.value}, ${email.value}, ${message.value}`);
    Meteor.call('sendEmail', name.value, email.value, message.value);
  };

  function submitForm(e) {
    e.preventDefault()
    const todaysDate = new Date().getDate()
      // console.log(`form elements: ${name.value}, ${email.value}, ${message.value}`);
    Meteor.call('sendEmail', name.value, email.value, message.value);
    setTimeout(function() {
    	browserHistory.push('/thankyou');
      // window.location.replace("/thankyou");
    }, 2000);

    localStorage.setItem('emailSentDate', todaysDate);
    // console.info(localStorage.getItem('emailSentDate'));
  };
  // console.info(localStorage.getItem('emailSentDate'));
  if (sameDay()) {
    return (
      <div className="ui center aligned container" style={{margin: "6em auto"}}>
			  <h1 className="ui icon header">
				  <i className="massive yellow frown icon"></i>
				  <div className="content">
				    Oops !
				    <div className="sub header">Try again tomorrow</div>
				  </div>
				</h1>
			</div>
    );
  };

  return (
  	<div className="ui container">
	    <div className="ui middle aligned center aligned grid">
			  <div className="column" style={{maxWidth: "450px", margin: "6rem auto"}}>
			    <h1 className="ui header" style={{textAlign: "left", marginBottom: "2rem"}}>
		          Contact us 👳
		          <div className="sub header">
		              Questions, comments or suggestions, we want to hear from you.
		          </div>
		      </h1>
			    <form className="ui large form" onSubmit={submitForm}>
			      <div className="ui stacked segment">
			        <div className="field">
			          <div className="ui left icon input">
			            <i className="user icon"></i>
			            <input type="text" name="name" placeholder="Name" ref={(input) => { name = input; }}/>
			          </div>
			        </div>
			        <div className="field">
			          <div className="ui left icon input">
			            <i className="at icon"></i>
			            <input type="text" name="email" placeholder="Email" ref={(input) => { email = input; }}/>
			          </div>
			        </div>
			        <div className="field" style={{textAlign: "left"}}>
						    <label>Message:</label>
						    <textarea ref={(input) => { message = input; }}></textarea>
						  </div>
						  <button className="ui button ui fluid large teal submit button" type="submit">Send</button>
			        {/*<div className="ui fluid large teal submit button" onClick={buttonPress}>Send</div>*/}
			      </div>
			      <div className="ui error message"></div>
			    </form>
			  </div>
			</div>
  	</div>
  )
};

export default ContactPage;
