import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectGraph} from '../../actions/dashboard-index';


class DashboardList extends Component {

  createListItems() {
    return this.props.graphs.map((graph) => {
      return (
        <li key={graph.id}
          onClick = {() => this.props.selectGraph(graph)}
          >
          <h2>{graph.first} {graph.last}</h2>
        </li>
      )
    });
  }

  render() {
    return (
      <ul>
        {this.createListItems()}
      </ul>
    );
  }

}

function mapStateToProps(state) {
  return {
    graphs: state.graphs
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({selectGraph:selectGraph}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardList);
