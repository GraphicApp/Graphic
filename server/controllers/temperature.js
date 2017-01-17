const si = require('systeminformation'),
      winston = require('../services/winston'),
      settings = require('../services/settings'),
      os = require('os'),
      app = require('../index'),
      db = app.get('db'),
      smc = require('../services/smc/smc');


let platform = os.type();

if (settings.config.modules.temperature.status) {
  let module = 'temperature';
  setInterval(() => {
    if (platform == 'Linux') {
      si.cpuTemperature()
          .then(data => {
            for (let prop in data) {
              if (data.hasOwnProperty(prop) && data[prop] > 0) {
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
    } else if (platform == 'Darwin') {
      Object.keys(smc.metrics).forEach(function(key) {
        var value = smc.get(key);
        if (value > 0) {
          if (settings.config.db.postgres.status) {
            let values = {
              name: module +'.'+ smc.metrics[key],
              value: value
            }
            db.sysinput.insert(values, (err, article) => {
              if (err) winston.log.error(err);
            });
          }
        }
      });
    }
  }, settings.config.modules.temperature.interval);
}


if (settings.config.modules.fan.status && platform == 'Darwin') {
  let module = 'fan';
  setInterval(() => {
    let i, f = smc.fans();
    for (i = 0; i < f; i++) {
      if (settings.config.db.postgres.status) {
        let values = {
          name: module + '.F'+i+'Ac',
          value: smc.fanRpm(i)
        }
        db.sysinput.insert(values, (err, article) => {
          if (err) winston.log.error(err);
        });
      }
    }
  }, settings.config.modules.fan.interval);
}

exports.getTemperatureData = (req, res) => {
  // get from database
}
