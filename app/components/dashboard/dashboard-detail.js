import React from 'react';
import {connect} from 'react-redux';

class DashboardDetail extends React.Component {

  render() {
    if(!this.props.graph) {
      return (<h4>Please select an example to explore</h4>)
    }


    return (
      <div>
        
        <div>
          {this.props.graph.description}
        </div>
        <div>
          {this.props.graph.exampleGraph}
        </div>
        <div>
          {this.props.graph.details}
        </div>


      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    graph: state.activeGraph
  }
}

export default connect(mapStateToProps)(DashboardDetail);
