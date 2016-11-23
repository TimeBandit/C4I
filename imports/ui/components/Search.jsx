// modules
import React from 'react';
import { $ } from 'meteor/jquery';

var content = [
  { title: 'Andorra' },
  { title: 'United Arab Emirates' },
  { title: 'Afghanistan' },
  { title: 'Antigua' },
  { title: 'Anguilla' },
  { title: 'Albania' },
  { title: 'Armenia' },
  { title: 'Netherlands Antilles' },
  { title: 'Angola' },
  { title: 'Argentina' },
  { title: 'American Samoa' },
  { title: 'Austria' },
  { title: 'Australia' },
  { title: 'Aruba' },
  { title: 'Aland Islands' },
  { title: 'Azerbaijan' },
  { title: 'Bosnia' },
  { title: 'Barbados' },
  { title: 'Bangladesh' },
  { title: 'Belgium' },
  { title: 'Burkina Faso' },
  { title: 'Bulgaria' },
  { title: 'Bahrain' },
  { title: 'Burundi' }
  // etc
];

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
        source: content
      });
  }

  // ,
  //         searchFullText: false

  // RegisteredCharityNumber: el.RegisteredCharityNumber,
  //         CharityName: el.CharityName
  render() {

    const res = this.props.result.map(function(el, idx, arr) {
      return {
        title: el.CharityName,
        description: (el.RegisteredCharityNumber).toString()
      }
    })

    this.props.resultExists ? this.initialiseSearch(res) : 'waiting';
    console.log(this.props);

    return (
      <div className="ui fluid search">
			  <div className="ui icon input">
			    <input className="prompt" placeholder="Common passwords..." type="text"/>
			    <i className="search icon"></i>
			  </div>
			  <div className="results"></div>
			</div>
    );
  }
}
