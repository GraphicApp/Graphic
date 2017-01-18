const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      winston = require('./services/winston'),
      request = require('request'),
      http = require('http'),
      settings = require('./services/settings');

const app = module.exports = express();
let port = settings.config.port;
http.createServer(app).listen(port, () => {
  console.log('Starting node server on', port);
});
// app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

// const lovefield = require('./db/lovefield');
// const rethinkdb = require('./db/rethinkdb');
const pouchdb = require('./db/pouchdb'),
      postgres = require('./db/postgres'),
      api = require('./controllers/api');
