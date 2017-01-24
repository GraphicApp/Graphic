import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as settingsActions from '../../actions/settingsActions';
import InfoDisplay from '../common/InfoDisplay';
import Config from './Configuration';

class Settings extends React.Component {
  constructor(props, context) {
    super(props, context)
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
          settings={this.props.settings}
        />
      </section>
    )
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
};

// Settings.contextTypes = {
//   router: PropTypes.object
// };

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings,
    info: state.info
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(settingsActions, dispatch);
// }

export default connect(mapStateToProps)(Settings);
