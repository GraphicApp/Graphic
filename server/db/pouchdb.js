const PouchDB = require('pouchdb'),
      winston = require('../services/winston'),
      app = require('../index'),
      settings = require('../services/settings');

if (settings.config.db.pouchdb.status || settings.config.db.couchdb.status) {
  let database = 'server/db/graphicdb';
  if (settings.config.db.couchdb.status) {
    let couch = settings.config.db.couchdb.status;
    database = 'http://' +couch.host+ ':' + couch.port.toString() +'/'+ couch.dbname;
  }
  // https://github.com/pouchdb/express-pouchdb
  // app.use('/pouchdb', require('express-pouchdb')(PouchDB));
  const pdb = new PouchDB(database); // , {auto_compaction: true}

  // pdb.get('system')
  //   .then(() => {
  //     winston.log.info('PouchDB loaded successfully.');
  //     console.log('HURRAY~~');
  //   })
  //   .catch(e => {
  //     winston.log.info('Could not find existing PouchDB...Creating new PouchDB from scratch.');
  //
  //     winston.log.info('New PouchDB docs created from scratch.');
  //     console.log('New PouchDB docs created from scratch.');
  //   });

  // console.log('TEST INSERT');
  // let data = {"Test": "testing"};
  // pdb.get('battery')
  //   .then(doc => doc.data.push(data))
  //   .catch(e => winston.log.error(e));


  // exports.pdb = pdb.info();
  // app.set('pdb');
  // const pdb = app.get('pdb');
  // let system = require('../controllers/system'),
  //       cpu = require('../controllers/cpu'),
  //       memory = require('../controllers/memory'),
  //       temperature = require('../controllers/temperature'),
  //       disk = require('../controllers/disk'),
  //       network = require('../controllers/network');


  let data = {
    "_id": new Date(),
    "name": "temperature.F0N1",
    "value": {"test2 key": "test object value"}
  }

  pdb.put(data)
  .then(doc => {
    console.log(doc);
  })
  // .then(doc => {
  //   console.log(doc);
  // })
  .catch(e => {
    console.error(e);
  });

  pdb.allDocs()
  .then(docs => {
    console.log(docs);
  })
  .catch(e => {
    console.error(e);
  });
  // pdb.get('network')
  //   .then(doc => {
  //     doc.data.push(newValue);
  //     return pdb.put(doc);
  //   })
  //   .then(function () {
  //     return pdb.get('network');
  //   })
  //   .then(function (doc) {
  //     console.log(doc);
  //   })
  //   .catch(err => console.log(err));
}

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
