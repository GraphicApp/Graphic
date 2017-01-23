import * as types from './actionTypes';
import axios from 'axios';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAllDataSuccess(data) {
  return { type: types.LOAD_ALL_DATA, data };
}

export function loadAllData() {
  // let url = 'http://localhost:' +settings.port+ '/api/' +module+ '/data' +(time ? time : 'today');
  let url = 'http://localhost:3000/api/battery/data/all'
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(url)
      .then(res => {
        dispatch(loadAllDataSuccess(res.body.data));
      })
      .catch(error => {
        throw(error);
      });
  };
}



// export function getStream(dispatch) {
//   let url = 'http://localhost:' +settings.port+ '/api/' +module+ '/stream'
//   axios.get(url)
//     .then(res => {
//       dispatch(addStreamAction(res.))
//     });
// }
