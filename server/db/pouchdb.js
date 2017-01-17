const PouchDB = require('pouchdb'),
      winston = require('../services/winston'),
      app = require('../index'),
      settings = require('../services/settings');

if (settings.config.db.pouchdb.status || settings.config.db.couchdb.status) {
  let database = 'server/db/graphicdb';
  if (settings.config.db.couchdb.status && !settings.config.db.pouchdb.status) {
    let couch = settings.config.db.couchdb;
    database = (couch.ssl ? 'https://' : 'http://') +couch.host+ ':' + couch.port.toString() +'/'+ (couch.dbname ? couch.dbname : 'graphicdb');
  }
  winston.log.info('Connecting to', (settings.config.db.couchdb.status ? 'CouchDB':'PouchDB'), database);

  app.use('/pouchdb', require('express-pouchdb')(PouchDB));
  const pdb = new PouchDB(database); // , {auto_compaction: true}

  exports.store = (obj) => {
    pdb.post(obj)
      .then(doc => {
        // console.log(doc);
        // send to sockets?
      })
      .catch(err => {
        winston.log.error('Could not store metric for', obj.name+'...', err);
      })
  }

  exports.destroyPouchDb = (req, res) => {
    pdb.destroy()
      .then(() => {
        res.status(200).send();
        winston.log.warn('PouchDB has been deleted by the user.')
      })
      .catch(err => {
        winston.log.err('Could not delete PouchDB database...', err);
        res.status(504).send(err);
      });
  }
}

// https://github.com/pouchdb/express-pouchdb

// pdb.allDocs({
//   // limit: ,
//   endkey: new Date().getTime() + 10
// })
// .then(docs => {
//   console.log('ALL DOCS QUERY HERE');
//   console.log(docs);
//
// })
// .catch(e => {
//   console.error(e);
// });
//
// let when = new Date().getTime() + 600;
// function getPostsSince(when) {
//   console.log('QUERY');
//   pdb.query('by_time', {endkey: when, descending: true})
//   .then(docs => console.log(docs))
//   .catch(e => console.error(e));
// }
// getPostsSince(when);


// pdb.bulkDocs = {
//   "_id": "system",
//   // "name": "system",
//   "data": []
// }, {
//   "_id": "processes",
//   // "name": "processes",
//   "data": []
// }, {
//   "_id": "battery",
//   // "name": "battery",
//   "data": []
// }, {
//   "_id": "cpu",
//   // "name": "cpu",
//   "data": []
// }, {
//   "_id": "memory",
//   // "name": "memory",
//   "data": []
// }, {
//   "_id": "disk",
//   // "name": "disk",
//   "data": []
// }, {
//   "_id": "diskfs",
//   // "name": "diskfs",
//   "data": []
// }, {
//   "_id": "temperature",
//   // "name": "temperature",
//   "data": []
// }, {
//   "_id": "fan",
//   // "name": "fan",
//   "data": []
// }, {
//   "_id": "network",
//   // "name": "network",
//   "data": []
// }, {
//   "_id": "netConnections",
//   // "name": "netConnections",
//   "data": []
// };
