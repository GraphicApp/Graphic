import * as types from './actionTypes';
import axios from 'axios';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadLogsSuccess(logs) {
  return { type: types.LOAD_LOGS, logs };
}

export function loadLogs() {
  let url = `http://localhost:${process.env.PORT}/api/logs`;
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(url)
      .then(res => {
        console.log(res.data);
        let data = JSON.parse(res.data);
        dispatch(loadLogsSuccess(data));
      })
      .catch(error => {
        throw(error);
      });
  };
}
