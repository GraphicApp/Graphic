import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as settingsActions from '../../actions/settingsActions';
import Config from './Configuration';

class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <section>
        <h2>Settings</h2>
        <Config settings={this.props.settings} />
      </section>
    )
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(settingsActions, dispatch);
// }

export default connect(mapStateToProps)(Settings);
