// modules
import React from 'react';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router'

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchContent: [],
    };
    this.initialiseSearch = this.initialiseSearch.bind(this);
  }

  componentDidMount() {
  	try {
  		// statements
	    Meteor.call('getSearchContent', (err, res) => {
	      console.log(`in the method call`, res[0]);
	      this.setState({ searchContent: res });
	    });
  	} catch(e) {
  		// statements
  		console.log(e);
  	}
  }

  // redirect() {
  //   console.log(result);
  //   browserHistory.push(`/charity/${result.description}`)
  //   return false;
  // }

  initialiseSearch() {
    $('.ui.search')
      .search({
        source: this.state.searchContent,
        onSelect: function(result, response) {
          console.log(result);
          browserHistory.push(`/charity/${result.description}`)
          return false;
        }
      });
  }

  render() {

    // const res = this.props.result.map(function(el, idx, arr) {
    //   return {
    //     title: el.CharityName,
    //     description: (el.RegisteredCharityNumber).toString()
    //   }
    // })

    this.state.searchContent ? this.initialiseSearch() : 'waiting';

    return (
      <div className="ui search">
			  <div className="ui big icon input">
			    <input 
				    className="prompt" 
				    placeholder="Charity name or number..." 
				    type="text"
			    />
			    <i className="search icon"></i>
			  </div>
			  <div className="results"></div>
			</div>
    );
  }
}
