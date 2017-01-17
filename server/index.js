const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      winston = require('./services/winston'),
      request = require('request'),
      http = require('http');

const app = module.exports = express();
// app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());


const postgres = require('./db/postgres');
// const lovefield = require('./db/lovefield');
const pouchdb = require('./db/pouchdb');
// const rethinkdb = require('./db/rethinkdb');
const api = require('./controllers/api');

let port = 3000;
http.createServer(app).listen(port, () => {
  winston.log.info('Starting node server on', port);
});
