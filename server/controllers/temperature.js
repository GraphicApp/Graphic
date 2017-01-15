const si = require('systeminformation'),
      winston = require('../services/winston'),
      settings = require('../services/settings'),
      os = require('os');

let platform = os.type();

if (settings.config.modules.temperature.status) {
  setInterval(() => {
    if (platform == 'Linux') {
      si.cpuTemperature()
          .then(data => console.log('LINUX TEMPS', data))
          .catch(error => winston.log.error(error));
    } else if (platform == 'Darwin') {
      // mac
      const smc = require('../services/smc/smc');
      Object.keys(smc.metrics).forEach(function(key) {
        var value = smc.get(key);
        if (value > 0) {
          console.log('TEMP -', key, smc.metrics[key]+':', value);
        }
      });
      // Fans
      var i, f = smc.fans();
      for (i = 0; i < f; i++) {
        console.log('FAN -', 'F'+i+'Ac', 'Fan', i, 'RPM:', smc.fanRpm(i));
      }
    }
  }, settings.config.modules.temperature.interval);
}

exports.getTemperatureData = (req, res) => {
  // get from database
}
