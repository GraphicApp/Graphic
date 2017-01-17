const pouchdb = require('pouchdb');

let db = new PouchDB('sysdata').info().then(function () {
    idb.innerHTML = '&#10003';
  }).catch(function (err) {
    idb.innerHTML = "Nope, got an error: " + err;
  });

let doc = {
  "name": "network",
  "data": [
    {
      "time": new Date(),
      "metric": "test name",
      "value": {"test key": "test object value"}
    }
  ]
}

db.put(doc);


let newValue = {
  "time": new Date(),
  "metric": "test2 name2",
  "value": {"test2 key": "test object value"}
}

db.get('network')
  .then(doc => {
    doc.data.push(newValue);
    return db.put(doc);
  }).then(function () {
    // fetch mittens again
    return db.get('mittens');
  }).then(function (doc) {
    console.log(doc);
  }).catch(err => console.log(err));
