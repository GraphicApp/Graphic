import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import {loadSettings} from './actions/settingsActions';
import {loadInfo} from './actions/infoActions';
import './assets/styles.scss';

const store = configureStore();
store.dispatch(loadSettings());
store.dispatch(loadInfo());


const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
