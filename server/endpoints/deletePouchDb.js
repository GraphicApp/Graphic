const winston = require('../services/winston'),
      settings = require('../services/settings'),
      pouchdb = require('../db/pouchdb');

exports.destroyPouchDb = (req, res) => {
  pouchdb.destroy()
    .then(() => {
      res.status(200).send();
      winston.log.warn('PouchDB/CouchDB database has been deleted by the user.')
    })
    .catch(err => {
      winston.log.err('Could not delete PouchDB/CouchDB database...', err);
      res.status(504).send(err);
    });
}
