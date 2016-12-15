import React from 'react'

const Activities = ({ data }) => {

	return (
  	<div className="column">
			<div className="ui segment">
				<h4 className="ui header">
					{data}
					<div className="sub header">Activites</div>
				</h4>
				
			</div>
		</div>
  );
}

export default Activities;