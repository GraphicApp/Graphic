const si = require('systeminformation'),
      settings = require('../services/settings'),
      winston = require('../services/winston'),
      app = require('../index'),
      db = app.get('db');



if (settings.config.modules.disk.status) {
  let module = 'disk';
  setInterval(() => {
    si.fsStats()
        .then(data => {
          for (let prop in data) {
            if (data.hasOwnProperty(prop) && data[prop] > -1) {
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
    si.disksIO()
        .then(data => {
          for (let prop in data) {
            if (data.hasOwnProperty(prop) && data[prop] > -1) {
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
  }, settings.config.modules.disk.interval)
}

if (settings.config.modules.diskfs.status) {
  let module = 'diskfs'
  setInterval(() => {
    si.fsSize()
        .then(data => {
          data.forEach(el => {
            for (let prop in el) {
              if (el.hasOwnProperty(prop) && prop !== 'fs' && prop !== 'type' && prop !== 'mount') {
                if (settings.config.db.postgres.status) {
                  let values = {
                    name: module +'.'+ prop,
                    value: el[prop]
                  }
                  db.sysinput.insert(values, (err, article) => {
                    if (err) winston.log.error(err);
                  });
                }
                // other DB
              }
            }
          })
        })
        .catch(error => winston.log.error(error));
  }, settings.config.modules.diskfs.interval);
}


exports.getDiskData = (req, res) => {
  // get from database
}

exports.getDiskSpaceData = (req, res) => {
  // get from database
}
