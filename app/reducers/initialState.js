export default {
  data: {
    cpu: [],
    processes: [],
    memory: [],
    temperature: [],
    fan: [],
    battery: [],
    disk: [],
    diskfs: [],
    network: [],
    netConnections: []
  },
  info: {},
  settings: {
    logLevel: '',
    port: '',
    modules: {
      system: {status: ''},
      cpu: {status: '', interval: ''},
      processes: {status: '', interval: ''},
      memory: {status: '', interval: ''},
      temperature: {status: '', interval: ''},
      fan: {status: '', interval: ''},
      battery: {status: '', interval: ''},
      disk: {status: '', interval: ''},
      diskfs: {status: '', interval: ''},
      network: {status: '', interval: '', iface: '', ping: ''},
      netConnections: {status: '', interval: ''}
    },
    db: {
      rethinkdb: {status: '', host: '', port: '', authKey: '', dbname: ''},
      postgres: {status: '', host: '', port: '', user: '', pass: '', dbname: ''},
      pouchdb: {status: ''},
      couchdb: {status: '', host: '', port: '', dbname: '', ssl: ''}
    }
  },
  ajaxCallsInProgress: 0
};
