const si = require('systeminformation'),
      settings = require('../services/settings'),
      winston = require('../services/winston');

if (settings.config.modules.disk.status) {
  setInterval(() => {
    si.fsStats()
        .then(data => console.log(data))
        .catch(error => winston.log.error(error));
    si.disksIO()
        .then(data => console.log('DISKIO -', data))
        .catch(error => winston.log.error(error));
  }, settings.config.modules.disk.interval)
}

if (settings.config.modules.diskSpace.status) {
  setInterval(() => {
    si.fsSize()
        .then(data => console.log('FILESYSTEM -', data))
        .catch(error => winston.log.error(error));
  }, settings.config.modules.diskSpace.interval);
}

// si.blockDevices()
//   .then(data => console.log('DISKS/PARTITIONS -', data))
//   .catch(error => winston.log.error(error));
