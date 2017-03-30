import React from 'react';

const ContactPage = () => {
  function buttonPress(e) {
    console.log(`button was pressed at: ${new Date()}`);
  };

  return (
    <div className="ui middle aligned center aligned grid">
		  <div className="column" style={{maxWidth: "450px", margin: "6rem auto"}}>
		    <h1 className="ui header" style={{textAlign: "left", marginBottom: "2rem"}}>
	          Contact us 👳
	          <div className="sub header">
	              Questions, comments or suggestions, we want to hear from you.
	          </div>
	      </h1>
		    <form className="ui large form">
		      <div className="ui stacked segment">
		        <div className="field">
		          <div className="ui left icon input">
		            <i className="user icon"></i>
		            <input type="text" name="name" placeholder="Name"/>
		          </div>
		        </div>
		        <div className="field">
		          <div className="ui left icon input">
		            <i className="at icon"></i>
		            <input type="text" name="email" placeholder="Email"/>
		          </div>
		        </div>
		        <div className="field" style={{textAlign: "left"}}>
					    <label>Message:</label>
					    <textarea></textarea>
					  </div>
		        <div className="ui fluid large teal submit button" onClick={buttonPress}>Send</div>
		      </div>
		      <div className="ui error message"></div>
		    </form>
		  </div>
		</div>
  )
};

export default ContactPage;
