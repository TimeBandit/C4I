// modules
import React from 'react';
import { $ } from 'meteor/jquery';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
  	console.log('inside search');
  	console.log(this.props.bogey, this.props.result);
  	this.props.resultExists ? console.log(this.props.result) : 'waiting';
    $('.ui.search')
      .search({
        source: this.props.result,
        searchFields: [
          'RegisteredCharityNumber',
          'CharityName'
        ],
        searchFullText: false
      });
  }

  render() {
  	console.log(this.props.bogey, this.props.result);
    return (
      <div className="ui search">
		  <div className="ui icon input">
		    <input className="prompt" placeholder="Common passwords..." type="text"/>
		    <i className="search icon"></i>
		  </div>
		  <div className="results"></div>
		</div>
    );
  }
}