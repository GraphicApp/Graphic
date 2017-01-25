const winston = require('../services/winston');

var options = {
    from: new Date - 24 * 60 * 60 * 1000,
    until: new Date,
    limit: 10,
    start: 0,
    order: 'desc',
    fields: ['message', 'timestamp']
  };

winston.log.query(options, function (err, results) {
  if (err) log.error(err);
  console.log('logs', results);
});
