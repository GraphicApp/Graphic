const si = require('systeminformation'),
      settings = require('../services/settings'),
      winston = require('../services/winston'),
      app = require('../index'),
      db = app.get('db'),
      pdb = require('../db/pouchdb');

if (settings.config.modules.memory.status) {
  let module = 'memory';
  setInterval(() => {
    si.mem()
        .then(data => {
          if (settings.config.db.pouchdb.status || settings.config.db.couchdb.status) {
            let obj = {};
            obj.time = new Date().getTime();
            obj.name = module;
            obj.value = data;
            pdb.store(obj);
          }
          if (settings.config.db.postgres.status) {
            for (let prop in data) {
              if (data.hasOwnProperty(prop)) {
                let values = {
                  name: module +'.'+ prop,
                  value: data[prop]
                }
                db.graphicdb.insert(values, (err, article) => {
                  if (err) winston.log.error(err);
                });
              }
            }
          }
        })
        .catch(error => winston.log.error(error));
  }, settings.config.modules.memory.interval)
}
