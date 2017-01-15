const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      winston = require('./services/winston'),
      request = require('request');

const app = module.exports = express();
// app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
const api = require('./controllers/api');


let port = 3000;
app.listen(port, () => {
  console.log('listening on ' + port);
});
