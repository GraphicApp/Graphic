const express = require('express'),
      winston = require('./services/winston'),
      request = require('request'),
      system = require('./controllers/system');

var app = module.exports = express();


let port = 3000;
app.listen(port, () => {
  console.log('listening on ' + port);
});


system.getStats();
