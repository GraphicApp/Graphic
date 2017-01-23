import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import {loadSettings} from './actions/settingsActions';
// import {loadAllData} from './actions/dataActions';

import './assets/styles.scss';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(loadSettings());
// store.dispatch(loadAllData());

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
