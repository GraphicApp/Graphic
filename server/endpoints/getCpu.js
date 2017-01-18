const winston = require('../services/winston'),
      settings = require('../services/settings'),
      cpu = require('../controllers/cpu'),
      request = require('request'),
      app = require('../index'),
      db = app.get('db'),
      postgres = require('../db/postgres');

let couch = settings.config.db.couchdb,
    xouchdbUrl = (couch.ssl ? 'https://' : 'http://') +couch.host+ ':' + (couch.status ? couch.port : settings.config.port).toString() + (settings.config.db.pouchdb.status ? '/pouch/' : '/') + (couch.dbname ? couch.dbname : 'graphicdb');

exports.getCpuData = (req, response) => {
  let module = 'cpu';
  if (!settings.config.modules.cpu.status) {
    winston.log.error('Attempted to get', module, 'but data for that module is turned off');
    res.status(200).send('Cannot GET...', module, 'data is turned off.');
  } else if (settings.config.db.pouchdb.status || settings.config.db.couchdb.status) {
    let dbUrl = xouchdbUrl +'/_design/' + module + '/_view/' + req.params.time;
    request.get(dbUrl, (err, res) => {
      if (err) winston.log.error('Error getting', module, 'from PouchDB/CouchDB...', err);
      winston.log.info('Data retreived from PouchDB/CouchDB for', module);
      response.status(200).send(res);
    });
  } else if (settings.config.db.postgres.status) {
    db.run(postgres.getQuery(req.params.time), [module+'%'], (err, res) => {
      if (err) {
        winston.log.error('Error getting', module, 'from Postgres...', err);
        response.status(504).send(err);
      }
      winston.log.info('Data retreived from PostgreSQL for', module);
      response.status(200).send(res);
    });
  }
}

//

exports.getServices = (req, response) => {
  cpu.getServices(req.params.process)
        .then(data => res.status(200).send(data))
        .catch(error => {
          winston.log.error(error);
          response.status(504).send();
        });
}

exports.getProcessLoad = (req, response) => {
  cpu.processLoad(req.params.process)
      .then(data => res.status(200).send(data))
      .catch(error => {
        winston.log.error(error);
        response.status(504).send();
      });
}

exports.getProcesses = (req, response) => {
  let module = 'processes';
  if (!settings.config.modules.processes.status) {
    winston.log.error('Attempted to get', module, 'but data for that module is turned off');
    res.status(200).send('Cannot GET...', module, 'data is turned off.');
  } else if (settings.config.db.pouchdb.status || settings.config.db.couchdb.status) {
    let dbUrl = xouchdbUrl +'/_design/' + module + '/_view/' + req.params.time;
    request.get(dbUrl, (err, res) => {
      if (err) winston.log.error('Error getting', module, 'from PouchDB/CouchDB...', err);
      winston.log.info('Data retreived from PouchDB/CouchDB for', module);
      response.status(200).send(res);
    });
  } else if (settings.config.db.postgres.status) {
    db.run(postgres.getQuery(req.params.time), [module+'%'], (err, res) => {
      if (err) {
        winston.log.error('Error getting', module, 'from Postgres...', err);
        response.status(504).send(err);
      }
      winston.log.info('Data retreived from PostgreSQL for', module);
      response.status(200).send(res);
    });
  }
}
