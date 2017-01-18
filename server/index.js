const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      winston = require('./services/winston'),
      request = require('request'),
      http = require('http'),
      settings = require('./services/settings');

const app = module.exports = express();
// app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

winston.log.error('TESTING this is the message yo');

// const lovefield = require('./db/lovefield');
// const rethinkdb = require('./db/rethinkdb');
const pouchdb = require('./db/pouchdb'),
      postgres = require('./db/postgres'),
      api = require('./controllers/api');

let port = 3000;
http.createServer(app).listen(port, () => {
  winston.log.info('Starting node server on', port);
});
