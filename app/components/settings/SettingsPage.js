import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as settingsActions from '../../actions/settingsActions';
import InfoDisplay from '../common/InfoDisplay';
import Config from './Configuration';
import LogsDisplay from './LogsDisplay';
import toastr from 'toastr';

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: Object.assign({}, props.settings)
    }
    this.changeSettings = this.changeSettings.bind(this);
    toastr.options = {"positionClass": "toast-bottom-right",}
    console.log(this.props.loading);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.settings.logLevel != nextProps.settings.logLevel) {
      this.setState({settings: Object.assign({}, nextProps.settings)});
    }
  }

  componentDidUpdate() {
    console.log(this.props.loading);
  }

  changeSettings(event) {
    if (event.target.id === "modules") {
      if (event.target.type === 'checkbox') {
        const field = event.target.name;
        let settings = this.state.settings;
        settings.modules[field].status = event.target.checked;
        this.shouldSaveSettings();
        return this.setState({settings});
      }
    } else if (event.target.id === 'db') {
      if (event.target.type === 'checkbox') {
        const field = event.target.name;
        let settings = this.state.settings;
        settings.db[field].status = event.target.checked;
        this.shouldSaveSettings();
        return this.setState({settings});
      }
    }
  }

  resetTimer: null;
  shouldSaveSettings() {
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
      this.resetTimer = null;
    }
    this.resetTimer = setTimeout(() => {
      this.props.actions.saveSettings(this.state.settings)
        .then(() => this.confirmSettingsSaved())
        .catch(error => {
          toastr.error('Error saving settings...', error);
        })
    }, 3000);
  }

  confirmSettingsSaved() {
    toastr.success('Settings saved');
  }

  componentDidUpdate() {
    // console.log(this.state);
  }

  render() {
    return(
      <section className="settings-page">
        <Config
          settings={this.state.settings}
          onChange={this.changeSettings}
        />
        <LogsDisplay
          logs={this.props.logs}
        />
      </section>
    )
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  logs: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings,
    info: state.info,
    logs: state.logs,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(settingsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
