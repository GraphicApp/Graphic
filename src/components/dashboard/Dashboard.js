import React from 'react';
import browserHistory from 'react-router';
// import './Dashboard.scss';

// import { connect } from 'react-redux';
// import { login } from '../../ducks/userDuck';

// import { getBatteryData } from '../../redux/data';
import Graph from '../common/Graph';


class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    
  }

  render() {
    return(
      <section>
        <h2>Dashboard</h2>
        <Graph

          />
      </section>
    )
  }
}

export default Dashboard;
