import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Dashboard from './components/dashboard/Dashboard';
import Monitor from './components/monitor/Monitor';
import Settings from './components/settings/Settings';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="monitor" component={Monitor} />
    <Route path="settings" component={Settings} />
  </Route>
);
