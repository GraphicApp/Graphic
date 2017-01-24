import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import {loadSettings} from './actions/settingsActions';
import {loadInfo} from './actions/dataActions';
import './assets/styles.scss';

const store = configureStore();
store.dispatch(loadSettings());
store.dispatch(loadInfo());

// import {loadData} from './actions/dataActions';
// store.dispatch(loadData('battery', 'today'));

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
