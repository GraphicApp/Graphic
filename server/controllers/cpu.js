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
  }, settings.config.modules.cpu.interval);
}


if (settings.config.modules.processes.status) {
  setInterval(() => {
    si.processes()
        .then(data => console.log('PROCESSES -', data))
        .catch(error => winston.log.error(error));
  }, settings.config.modules.processes.interval);
}

exports.getServices = (req, res) => {
  si.processLoad(req.params.service)
      .then(data => res.status(200).send(data))
      .catch(error => {
        winston.log.error(error);
        res.status(504).send();
      });
}

exports.getProcessLoad = (req, res) => {
  si.processLoad(req.params.process)
      .then(data => res.status(200).send(data))
      .catch(error => {
        winston.log.error(error);
        res.status(504).send();
      });
}

exports.getCpuData = (req, res) => {
  // get from database
}

exports.getProcesses = (req, res) => {
  // get from database
}
