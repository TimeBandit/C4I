// modules
import React from 'react';
import { $ } from 'meteor/jquery';
import { browserHistory } from 'react-router'

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchContent: [],
    };
    this.initialiseSearch = this.initialiseSearch.bind(this);
  }
  componentDidMount() {}

  initialiseSearch(content) {
    console.log(content);
    $('.ui.search')
      .search({
        source: content,
        onSelect: function (result, response) {
        	console.log(result);
        	browserHistory.push(`/charity/${result.description}`)
        }
      });
  }

  render() {

    const res = this.props.result.map(function(el, idx, arr) {
      return {
        title: el.CharityName,
        description: (el.RegisteredCharityNumber).toString()
      }
    })

    this.props.resultExists ? this.initialiseSearch(res) : 'waiting';

    return (
      <div className="ui fluid search">
			  <div className="ui icon input">
			    <input 
				    className="prompt" 
				    placeholder="Common passwords..." 
				    type="text"
			    />
			    <i className="search icon"></i>
			  </div>
			  <div className="results"></div>
			</div>
    );
  }
}
