import React from 'react'

const PublishedReports = ({ data }) => {

  const Item = function({ trustee }) {
    return (
      <tr>
	      <td>{trustee.TrusteeName}</td>
	      <td>{trustee.TrusteeNumber}</td>
	      <td>{trustee.RelatedCharitiesCount > 0 ? "Yes" : "No"}</td>
	    </tr>
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
				Trustees
			</h3>
			<div className="ui attached segment">
		  	<table className="ui very basic table">
				  <thead>
				    <tr>
				      <th>Name</th>
				      <th>Trustee Number</th>
				      <th>Holding Trusteeships?</th>
				    </tr>
				  </thead>
				  <tbody>
				    {trusteeList(data)}	
				  </tbody>
				</table>
			</div>  		
  	</span>
  );
}

export default PublishedReports;
