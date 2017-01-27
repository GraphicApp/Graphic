const winston = require('../services/winston'),
      app = require('../index'),
      system = require('../controllers/system'),
      request = require('request'),
      db = app.get('db'),
      settings = app.locals.settings.config;

let couch = settings.db.couchdb,
    xouchdbUrl = (couch.ssl ? 'https://' : 'http://') +couch.host+ ':' + (couch.status ? couch.port : settings.port).toString() + (settings.db.pouchdb.status ? '/pouch/' : '/') + (couch.dbname ? couch.dbname : 'graphicdb');

exports.getSystemInfo = (req, response) => {
  system.getSystemInfo()
    .then(res => {
      response.status(200).send(res);
    })
    .catch(err => {
      winston.log.error('Error getting system information...', err);
      response.status(500).send(err);
    });
}

exports.getBatteryData = (req, response) => {
  let module = 'battery';
  if (!settings.modules.battery.status) {
    response.status(200).send('Cannot GET...', module, 'data is turned off.');
  } else if (settings.db.pouchdb.status || settings.db.couchdb.status) {
    let dbUrl = xouchdbUrl +'/_design/' + module + '/_view/' + req.params.time;
    request.get(dbUrl, (err, res) => {
      if (err) winston.log.error('Error getting', module, 'from PouchDB/CouchDB...', err);
      winston.log.info('Data retreived from PouchDB/CouchDB for', module);
      response.status(200).send(res);
    });
  } else if (settings.db.postgres.status) {
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
