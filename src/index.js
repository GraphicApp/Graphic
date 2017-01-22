/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {loadSettings} from './actions/settingsActions'; //eslint-disable-line import/no-named-as-default
// import {loadAllData} from './actions/dataActions';

// import './assets/styles.css';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(loadSettings());
// store.dispatch(loadAllData());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
