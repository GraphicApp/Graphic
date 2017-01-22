import Settings from '../../server/services/config.json';
import axios from 'axios';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadSettingsSuccess(settings) {
  return {type: types.LOAD_SETTINGS, settings};
}

export function loadSettings() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return axios.get(Settings)
      .then(res => {
        dispatch(loadSettingsSuccess(res.body));
      })
      .catch(error => {
        throw(error);
      });
  };
}


// export function putSettings(dispatch) {
//   let url = 'local';
//   axios.put(url)
//     .then(res => {
//       dispatch(addSettingsAction(res.body.config));
//     });
// }


// settings: {
//   logLevel: 'warn',
//   saveData: true,
//   port: 3000,
//   modules: {
//     system: {status: false},
//     cpu: {status: true, interval: 5000},
//     processes: {status: false, interval: 30000},
//     memory: {status: true, interval: 5000},
//     temperature: {status: true, interval: 5000},
//     fan: {status: true, interval: 5000},
//     battery: {status: true, interval: 5000},
//     disk: {status: true, interval: 5000},
//     diskfs: {status: false, interval: 900*1000},
//     network: {status: true, interval: 5000, iface: '', ping: ''},
//     netConnections: {status: false, interval: 1800*1000}
//   },
//   db: {
//     rethinkdb: {status: false, host: '', port: '', authKey: '', dbname: ''},
//     postgres: {status: false, host: 'localhost', port: 5432, user: 'postgres', pass: '', dbname: 'graphicdb'},
//     pouchdb: {status: true},
//     couchdb: {status: false, host: 'localhost', port: 5984, dbname: '', ssl: false}
//   }
// };
