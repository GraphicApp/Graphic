const si = require('systeminformation'),
      winston = require('../services/winston'),
      settings = require('../services/settings'),
      app = require('../index'),
      db = app.get('db');

if (settings.config.modules.cpu.status) {
  let module = 'cpu';
  setInterval(() => {
    si.cpuCurrentspeed()
        .then(data => {
          for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
              if (settings.config.db.postgres.status) {
                if (typeof(data[prop]) === 'boolean') {
                  data[prop] = data[prop] ? 1 : 0;
                }
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

    si.currentLoad()
        .then(data => {
          for (let prop in data) {
            if (data.hasOwnProperty(prop) && !data[prop] instanceof Array) {
              if (settings.config.db.postgres.status) {
                if (typeof(data[prop]) === 'boolean') {
                  data[prop] = data[prop] ? 1 : 0;
                }
                let values = {
                  name: module +'.'+ prop,
                  value: data[prop]
                }
                db.sysinput.insert(values, (err, article) => {
                  if (err) winston.log.error(err);
                });
              }
            } else if (data.hasOwnProperty(prop) && data[prop] instanceof Array) {
              data[prop].forEach((el, i) => {
                for (let key in el) {
                  if (el.hasOwnProperty(key)) {
                    let values = {
                      name: module +'.'+ i + '.' + key,
                      value: el[key]
                    }
                    db.sysinput.insert(values, (err, article) => {
                      if (err) winston.log.error(err);
                    });
                  }
                }
              });
            }
          }
        })
        .catch(error => winston.log.error(error));

    si.fullLoad()
        .then(data => {
          if (settings.config.db.postgres.status) {
            let values = {
              name: module +'.'+ 'fullLoad',
              value: data
            }
            db.sysinput.insert(values, (err, article) => {
              if (err) winston.log.error(err);
            });
          }
          // other DB

        })
        .catch(error => winston.log.error(error));
  }, settings.config.modules.cpu.interval);
}

exports.getCpuData = (req, res) => {
  // get from database
}



if (settings.config.modules.processes.status) {
  setInterval(() => {
    si.processes()
        .then(data => console.log('PROCESSES -', data))
        .catch(error => winston.log.error(error));
  }, settings.config.modules.processes.interval);
}

exports.getServices = (req, res) => {
  si.processLoad(req.params.service)
      .then(data => res.status(200).send(data))
      .catch(error => {
        winston.log.error(error);
        res.status(504).send();
      });
}

exports.getProcessLoad = (req, res) => {
  si.processLoad(req.params.process)
      .then(data => res.status(200).send(data))
      .catch(error => {
        winston.log.error(error);
        res.status(504).send();
      });
}


exports.getProcesses = (req, res) => {
  // get from database
}
