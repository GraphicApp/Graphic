const si = require('systeminformation'),
      os = require('os'),
      settings = require('../services/settings'),
      winston = require('../services/winston'),
      getip = require('../services/getip'),
      app = require('../index'),
      db = app.get('db'),
      pdb = require('../db/pouchdb');

if (settings.config.modules.network.status) {
  let module = 'network';
  setInterval(() => {
    si.networkStats(settings.config.modules.network.iface)
        .then(data => {
          if (settings.config.db.pouchdb.status || settings.config.db.couchdb.status) {
            let obj = {};
            obj.time = new Date().getTime();
            obj.name = module;
            obj.value = data;
            pdb.store(obj);
          }
          for (let prop in data) {
            if (data.hasOwnProperty(prop) && data[prop] > -1 && prop !== 'iface' && prop !== 'operstate') {
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
    si.inetLatency(settings.config.modules.network.ping)
        .then(data => {
          if (settings.config.db.pouchdb.status || settings.config.db.couchdb.status) {
            let obj = {};
            obj.time = new Date().getTime();
            obj.name = module;
            obj.value = data;
            pdb.store(obj);
          }
          if (settings.config.db.postgres.status) {
            let values = {
              name: module +'.latency',
              value: data
            }
            db.sysinput.insert(values, (err, article) => {
              if (err) winston.log.error(err);
            });
          }
        })
        .catch(error => winston.log.error(error));
  }, settings.config.modules.network.interval);
}

exports.getNetworkData = (req, res) => {
  // get from database
}


if (settings.config.modules.netConnections.status) {
  let module = 'netConnections';
  setInterval(() => {
  si.networkConnections()
      .then(data => {
        data.forEach((el, i) => {
          for (let prop in el) {
            if (el.hasOwnProperty(prop)) {
              if (settings.config.db.postgres.status && (prop === 'localport' || prop === 'peerport')) {
                if (prop === 'state') {
                  var status;
                  if (el[prop] === 'ESTABLISHED') {
                    status = 0;
                  } else if (el[prop] === 'LISTEN') {
                    status = 1;
                  } else if (el[prop] === 'CLOSED_WAIT') {
                    status = 2;
                  } else if (el[prop] === 'TIME_WAIT') {
                    status = 3;
                  } else {
                    status = 4;
                  }
                }
                if (el[prop] === '*') {
                  el[prop] = 0;
                }
                if (prop === 'localport') {
                  var values = {
                    name: module +'.'+ el.protocol +'.'+ el.localaddress + (status ? ('.'+status) : ''),
                    value: el[prop]
                  }
                } else if (prop === 'peerport') {
                  var values = {
                    name: module +'.'+ el.protocol +'.'+ el.peeraddress + (status ? ('.'+status) : ''),
                    value: el[prop]
                  }
                }
                db.sysinput.insert(values, (err, article) => {
                  if (err) winston.log.error(err);
                });
              }
              // other DB
            }
          }
        });
      })
      .catch(error => winston.log.error(error));

  }, settings.config.modules.netConnections.interval);
}

exports.getNetworkConnections = (req, res) => {
  if (settings.config.modules.networkConnections.status) {
    res.status(200).send('Network Connection data is turned off.')
  } else {
    // get from database
  }
}

exports.getPublicIp = (req, res) => {
  getip.v4().then(ip => res.status(200).send(data));
  getip.v6().then(ip => console.log(ip));
}

exports.getCheckUrl = (req, res) => {
  si.inetChecksite(req.params.url)
      .then(data => res.status(200).send(data))
      .catch(error => {
        winston.log.error(error);
        res.status(504).send();
      });
}
