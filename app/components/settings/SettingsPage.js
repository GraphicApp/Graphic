import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as settingsActions from '../../actions/settingsActions';
import InfoDisplay from '../common/InfoDisplay';
import Config from './Configuration';
import toastr from 'toastr';

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: Object.assign({}, props.settings)
    }
    this.changeSettings = this.changeSettings.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.settings.logLevel != nextProps.settings.logLevel) {
      this.setState({settings: Object.assign({}, nextProps.settings)});
    }
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
    }, 5000);
  }

  confirmSettingsSaved() {
    toastr.success('Settings saved');
  }

  render() {
    return(
      <section>
        <h2>Settings</h2>
        <InfoDisplay
          info={this.props.info}
          location={this.props.location.pathname}
        />
        <Config
          settings={this.state.settings}
          onChange={this.changeSettings}
        />
      </section>
    )
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings,
    info: state.info
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(settingsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
