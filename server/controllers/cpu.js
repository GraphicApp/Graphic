const si = require('systeminformation'),
      winston = require('../services/winston'),
      settings = require('../services/settings');

if (settings.config.modules.cpu.status) {
  setInterval(() => {
    si.cpuCurrentspeed()
        .then(data => console.log('CPU speeds', data))
        .catch(error => winston.log.error(error));

    si.currentLoad()
        .then(data => console.log('LOAD (CURRENT) -', data))
        .catch(error => winston.log.error(error));

    si.fullLoad()
        .then(data => console.log('LOAD (FULL) -', data))
        .catch(error => winston.log.error(error));
  }, settings.config.modules.cpu.interval)
}


// PROCESSES
