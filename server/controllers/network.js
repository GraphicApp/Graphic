const si = require('systeminformation'),
      os = require('os'),
      settings = require('../services/settings'),
      winston = require('../services/winston');

if (settings.config.modules.network.status) {
  setInterval(() => {
    si.networkStats(settings.config.modules.network.iface)
        .then(data => console.log(data))
        .catch(error => winston.log.error(error));
    si.inetLatency(settings.config.modules.network.ping)
        .then(data => console.log(data))
        .catch(error => winston.log.error(error));
  }, settings.config.modules.network.interval);
}

exports.getNetworkData = (req, res) => {
  // get from database
}


if (settings.config.modules.networkConnections.status) {
  setInterval(() => {
  si.networkConnections()
      .then(data => console.log(data))
      .catch(error => winston.log.error(error));

  }, settings.config.modules.networkConnections.interval);
}

exports.getNetworkConnections = (req, res) => {
  if (settings.config.modules.networkConnections.status) {
    res.status(200).send('Network Connection data is turned off.')
  } else {
    // get from database
  }
}

exports.getCheckUrl = (req, res) => {
  si.inetChecksite(req.params.url)
      .then(data => res.status(200).send(data))
      .catch(error => {
        winston.log.error(error);
        res.status(504).send();
      });
}


// const getip = require('../services/getip');
// console.log('network interfaces:', os.networkInterfaces());
// console.log(`NETWORK - internal ip: ${os.networkInterfaces().en0[0].address} | mac address: ${os.networkInterfaces().en0[0].mac}`);
// getip.v4().then(ip => console.log(`public ip: ${ip}`));
// getip.v6().then(ip => console.log(ip));
