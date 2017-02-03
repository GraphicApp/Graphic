import {combineReducers} from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import data from './dataReducer';
import info from './infoReducer';
import settings from './settingsReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import logs from './logsReducer';




import graphs from './dashboard-graphs';
import activeGraph from './dashboard-active-graphs';

const rootReducer = combineReducers({
  routing,
  settings,
  data,
  info,
  logs,
  ajaxCallsInProgress,




  graphs,
  activeGraph
});

export default rootReducer;
