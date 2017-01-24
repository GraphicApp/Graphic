import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Graph from '../common/Graph';
import InfoDisplay from '../common/InfoDisplay';
import InfoQuery from '../common/InfoQuery';
import * as infoActions from '../../actions/infoActions';
import * as dataActions from '../../actions/dataActions';


class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sysInput: {
        process: '',
        service: ''
      }
    }

    this.updateInputs = this.updateInputs.bind(this);
    this.getProcess = this.getProcess.bind(this);
    this.getService = this.getService.bind(this);
  }

  componentDidUpdate() {
    let modules = this.props.settings.modules;
    this.modulesLoaded = Object.keys(modules).filter(el => modules[el].status);
    console.log(this.state);
  }

  updateInputs(event) {
    const field = event.target.name;
    let sysInput = this.state.sysInput;
    sysInput[field] = event.target.value;
    return this.setState({sysInput: sysInput});
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
          location={this.props.location.pathname}
        />
        <InfoQuery
          processInput={this.state.process}
          serviceInput={this.state.service}
          onSubmitProcess={this.getProcess}
          onSubmitService={this.getService}
          onChange={this.updateInputs}
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
