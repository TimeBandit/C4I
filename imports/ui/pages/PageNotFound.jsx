import React from 'react';
import { Link } from 'react-router'

const PageNotFound = () => (
	<div className="ui vertical basic segment">
      <div className="ui text container">
		      <div className="ui relaxed items">
					  <div className="item">
					    <div className="image">
					      <img src="/img/chimp.gif" />
					    </div>
					    <div className="content">
					      <a className="header">Ooops !</a>
					      <div className="meta">
					        <p>
					        	We are sorry but that page does not exist. 
					        	You could go home.
					        </p>
					        <Link className="ui large green button" to="/">
                    Home
                </Link>
					      </div>
					      <div className="description">
					        <p></p>
					      </div>
					      <div className="extra">
					      </div>
					    </div>
					  </div>
					</div>
      </div>
  </div>
);

export default PageNotFound;