const si = require('systeminformation'),
      winston = require('../services/winston'),
      app = require('../index'),
      db = app.get('db'),
      settings = app.locals.settings.config,
      pdb = require('../db/pouchdb');

if (settings.modules.memory.status) {
  let module = 'memory';
  setInterval(() => {
    si.mem()
        .then(data => {
          if (settings.db.pouchdb.status || settings.db.couchdb.status) {
            let obj = {};
            obj.time = new Date().getTime();
            obj.name = module;
            obj.value = data;
            pdb.store(obj);
          }
          if (settings.db.postgres.status) {
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
  }, settings.modules.memory.interval)
}
