const si = require('systeminformation'),
      settings = require('../services/settings'),
      winston = require('../services/winston');

if (settings.config.modules.memory.status) {
  setInterval(() => {
    si.mem()
        .then(data => console.log('mem', data))
        .catch(error => winston.log.error(error));
  }, settings.config.modules.memory.interval)
}

exports.getMemoryData = (req, res) => {
  // get from database
}
