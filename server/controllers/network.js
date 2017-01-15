const si = require('systeminformation'),
      os = require('os'),
      settings = require('../services/settings'),
      winston = require('../services/winston');

if (settings.config.modules.network.status) {
  setInterval(() => {
    si.networkStats()
        .then(data => console.log(data))
        .catch(error => winston.log.error(error));
  }, settings.config.modules.network.interval);
}

// const getip = require('../services/getip');
// console.log('network interfaces:', os.networkInterfaces());
// console.log(`NETWORK - internal ip: ${os.networkInterfaces().en0[0].address} | mac address: ${os.networkInterfaces().en0[0].mac}`);
// getip.v4().then(ip => console.log(`public ip: ${ip}`));
// getip.v6().then(ip => console.log(ip));
