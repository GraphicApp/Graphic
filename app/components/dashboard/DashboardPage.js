import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Graph from '../common/Graph';
import * as infoActions from '../../actions/infoActions';
import * as dataActions from '../../actions/dataActions';


class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      process: '',
      service: ''
    }

    this.getProcess = this.getProcess.bind(this);
    this.getService = this.getService.bind(this);
  }

  componentDidUpdate() {
    let modules = this.props.settings.modules;
    this.modulesLoaded = Object.keys(modules).filter(el => modules[el].status);
  }

  getProcess() {
    this.props.actions.getProcess(this.state.process)
      .then(() => {
        console.log(this.props.info);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getService() {
    this.props.actions.getService(this.state.service)
      .then(() => {
        console.log(this.props.info);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return(
      <section>
        <h2>Dashboard</h2>
        <InfoDisplay
          info={this.props.info}
          processInput={this.state.process}
          serviceInput={this.state.service}
          onSubmitProcess={this.getProcess}
          onSubmitService={this.getService}
        />
        <Graph

        />
      </section>
    )
  }
}

Dashboard.propTypes = {
  settings: PropTypes.object.isRequired,
  info: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    info: state.info,
    data: state.data,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(infoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
