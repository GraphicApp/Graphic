const express = require('express'),
      winston = require('./services/winston'),
      request = require('request');

// const system = require('./controllers/system'),
//       cpu = require('./controllers/cpu'),
//       memory = require('./controllers/memory'),
//       temperature = require('./controllers/temperature'),
//       disk = require('./controllers/disk'),
//       network = require('./controllers/network');

var app = module.exports = express();

let port = 3000;
app.listen(port, () => {
  console.log('listening on ' + port);
});
