const si = require('systeminformation'),
      winston = require('../services/winston'),
      app = require('../index'),
      db = app.get('db'),
      settings = app.locals.settings.config,
      pdb = require('../db/pouchdb');

if (settings.modules.cpu.status) {
  let module = 'cpu';
  setInterval(() => {
    si.cpuCurrentspeed()
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
                if (typeof(data[prop]) === 'boolean') {
                  data[prop] = data[prop] ? 1 : 0;
                }
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

    si.currentLoad()
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
              if (data.hasOwnProperty(prop) && !data[prop] instanceof Array) {
                if (typeof(data[prop]) === 'boolean') {
                  data[prop] = data[prop] ? 1 : 0;
                }
                let values = {
                  name: module +'.'+ prop,
                  value: data[prop]
                }
                db.graphicdb.insert(values, (err, article) => {
                  if (err) winston.log.error(err);
                });
              } else if (data.hasOwnProperty(prop) && data[prop] instanceof Array) {
                data[prop].forEach((el, i) => {
                  for (let key in el) {
                    if (el.hasOwnProperty(key)) {
                      let values = {
                        name: module +'.'+ i + '.' + key,
                        value: el[key]
                      }
                      db.graphicdb.insert(values, (err, article) => {
                        if (err) winston.log.error(err);
                      });
                    }
                  }
                });
              }
            }
          }
        })
        .catch(error => winston.log.error(error));

    si.fullLoad()
        .then(data => {
          if (settings.db.pouchdb.status || settings.db.couchdb.status) {
            let obj = {};
            obj.time = new Date().getTime();
            obj.name = module;
            obj.value = data;
            pdb.store(obj);
          }
          if (settings.db.postgres.status) {
            let values = {
              name: module +'.'+ 'fullLoad',
              value: data
            }
            db.graphicdb.insert(values, (err, article) => {
              if (err) winston.log.error(err);
            });
          }
          // other DB

        })
        .catch(error => winston.log.error(error));
  }, settings.modules.cpu.interval);
}


if (settings.modules.processes.status) {
  setInterval(() => {
    si.processes()
        .then(data => {
          if (settings.db.pouchdb.status || settings.db.couchdb.status) {
            let obj = {};
            obj.time = new Date().getTime();
            obj.name = module;
            obj.value = data;
            pdb.store(obj);
          }
        })
        .catch(error => winston.log.error(error));
  }, settings.modules.processes.interval);
}

exports.getServices = si.services;
exports.getProcessLoad = si.processLoad;
