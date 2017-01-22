import {combineReducers} from 'redux';
import data from './dataReducer';
import settings from './settingsReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  data,
  settings,
  ajaxCallsInProgress
});

export default rootReducer;
