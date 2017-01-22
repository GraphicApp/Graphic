import React from 'react';
import hashHistory from 'react-router';
// import './Graph.scss';


class Graph extends React.Component {
  render() {
    const data = this.props.battery.map(datum => {
      return(
        <div key={i}>{datum}</div>
      )
    })
    return(
      <section id="graph">
        {data}
      </section>
    )
  }
}

export default Graph;
