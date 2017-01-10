import React from 'react'

const PublishedReports = ({ data }) => {

  const Item = function({ trustee }) {
  	const baseLink = "http://apps.charitycommission.gov.uk"
    return (
      <div className="item">
		    <div className="right floated content">
		      <a className="ui button" href={baseLink + trustee.HyperlinkReference} target="_blank">Download</a>
		    </div>
		    <i className="file pdf outline icon"></i>
		    <div className="content">
		      {trustee.AccountPeriodYearEndDate}
		    </div>
		  </div>
    );
  };

  const trusteeList = (arr) => {
    return arr.map((obj, index) => {
      return (
        <Item trustee={obj} key={index} />
      )
    })
  }

  return (
    <span>
	  	<h3 className="ui top attached header">
				Charity Reports
			</h3>
			<div className="ui attached segment">
		  	<div className="ui middle aligned divided list">
			    {trusteeList(data)}	
				</div>
			</div>  		
  	</span>
  );
}

export default PublishedReports;