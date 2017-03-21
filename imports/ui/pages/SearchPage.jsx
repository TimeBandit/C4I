import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { connect } from 'react-redux'
import { currencyFormat } from '../helpers/helpers';


const CustomRowComponent = connect((state, props) => ({
    rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props)
  }))
  (({ rowData }) => (
    <tr className={rowData.Active === "No"? "error" : ""}>
	    <td>
	      <h4 className="ui header">
	          <div className="content">
	          	<a href={"/charity/" + rowData.Number}>
		            {rowData.Name}
	          	</a>
	            <div className="sub header">{rowData.Number}
	          </div>
	      	</div>
	    	</h4>
	    </td>
	    {/*<td>{rowData.Number}</td>*/}
	    <td>{rowData.Established}</td>
	    {/*<td>{rowData.Active}</td>*/}
	    <td>{currencyFormat(rowData.Incoming)}</td>
	    <td>{rowData.Employees}</td>
	    <td>{rowData.Postcode}</td>
	  </tr>
  ));

const defaultSortOrder = {
  sortProperties: [{ id: 'Incoming', sortDescending: true }]
};

const styleConfig = {
  icons: {
    TableHeadingCell: {
      sortDescendingIcon: <small>(desc)</small>,
      sortAscendingIcon: <small>(asc)</small>,
    },
  },
  classNames: {
    Table: 'ui very basic collapsing celled table',
    SettingsToggle: 'ui button search-settings',
    Filter: 'ui large input search-input',
    NextButton: 'ui button',
    PreviousButton: 'ui button',
    PageDropdown: 'ui dropdown'
  },
  styles: {

  }
}

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  componentWillMount() {
    console.time("list loading");
    const self = this;
    Meteor.call('searchTableData', function(error, result) {
      // console.log('method call ', result);
      if (result) {
        self.setState({ charities: result });
        console.timeEnd("list loading");
      }
    });
  };

  componentWillUnmount() {

  };

  render() {
    if (this.state.charities) {
      return (
        <div className="ui vertical segment">
          <div className="ui vertical basic segment cto-group">
            <div className="ui left aligned text container cto">
                <h1 className="ui header">
                    Looking for a charity?
                    <div className="sub header">
                        Type your search terms into the box. 
                        Click on a column heading to sort.
                        Highlighted rows are charities 
                        that are no longer active.
                    </div>
                </h1>
              </div>
          </div>
		    	<div className="ui text container">
		        <Griddle
					    data={this.state.charities}
					    plugins={[plugins.LocalPlugin]}
					    styleConfig={styleConfig}
					    sortProperties={[{ id: 'Incoming', sortDescending: true }]}
							components={{
							  Row: CustomRowComponent
							}}>
					    <RowDefinition>
					      <ColumnDefinition id="Name" title="Name" />
					      <ColumnDefinition id="Established" title="Established" />
					      <ColumnDefinition id="Incoming" title="Incoming" />
					      <ColumnDefinition id="Employees" title="Employees" />
					      <ColumnDefinition id="Postcode" title="Postcode" />
					    </RowDefinition>
					  </Griddle>
		    	</div>
	    	</div>
      );
    } else {
      return (
        <div className="ui equal width stackable vertically divided grid container">
            <div className="center aligned row">
                <div className="column">
                    <div className="ui active loader">Loading</div>
                </div>
            </div>
        </div>
      )

    }
  }
};
