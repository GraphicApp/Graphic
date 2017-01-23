import {combineReducers} from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import data from './dataReducer';
import settings from './settingsReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  data,
  settings,
  routing,
  ajaxCallsInProgress
});

export default rootReducer;
