const si = require('systeminformation'),
      os = require('os'),
      settings = require('../services/settings'),
      winston = require('../services/winston'),
      getip = require('../services/getip');


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

exports.getPublicIp = (req, res) => {
  getip.v4().then(ip => res.status(200).send(data));
  getip.v6().then(ip => console.log(ip));
}

exports.getCheckUrl = (req, res) => {
  si.inetChecksite(req.params.url)
      .then(data => res.status(200).send(data))
      .catch(error => {
        winston.log.error(error);
        res.status(504).send();
      });
}
