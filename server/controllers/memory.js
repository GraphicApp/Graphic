const si = require('systeminformation'),
      settings = require('../services/settings'),
      winston = require('../services/winston'),
      app = require('../index'),
      db = app.get('db');

if (settings.config.modules.memory.status) {
  let module = 'memory';
  setInterval(() => {
    si.mem()
        .then(data => {
          for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
              if (settings.config.db.postgres.status) {
                let values = {
                  name: module +'.'+ prop,
                  value: data[prop]
                }
                db.sysinput.insert(values, (err, article) => {
                  if (err) winston.log.error(err);
                });
              }
              // other DB
            }
          }
        })
        .catch(error => winston.log.error(error));
  }, settings.config.modules.memory.interval)
}

exports.getMemoryData = (req, res) => {
  // get from database
}
