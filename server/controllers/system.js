const os = require('os'),
      process = require('process'),
      si = require('systeminformation'),
      winston = require('../services/winston'),
      settings = require('../services/settings');

if (settings.config.modules.battery.status) {
  setInterval(() => {
    si.battery()
        .then(data => {
          if (data.hasbattery) {
            console.log('BATTERY - cycles', data.cyclecount);
            console.log('BATTERY - charging', data.ischarging);
            console.log('BATTERY - maxcapacity', data.maxcapacity);
            console.log('BATTERY - currentcapacity', data.currentcapacity);
            console.log('BATTERY - percent', data.percent);
          }
        })
        .catch(error => winston.log.error(error));
  }, settings.config.modules.battery.interval);
}

// SYSTEM INFO
console.log('HOST -', os.hostname());
si.users()
    .then(data => console.log('USERS -', data))
    .catch(error => winston.log.error(error));

si.cpu()
    .then(data => console.log('CPU -', data))
    .catch(error => winston.log.error(error));

console.log(`TIMES - ${si.time()}`)

// network interfaces (use to change graph data)
si.networkInterfaces()
    .then(data => console.log(data))
    .catch(error => winston.log.error(error));


si.system()
    .then(data => console.log('HARDWARE -', data))
    .catch(error => winston.log.error(error));

si.graphics()
    .then(data => console.log('GRAPHICS -', data))
    .catch(error => winston.log.error(error));

si.osInfo()
    .then(data => console.log('OS -', data))
    .catch(error => winston.log.error(error));


// disk partitions
si.blockDevices()
  .then(data => console.log('DISKS/PARTITIONS -', data))
  .catch(error => winston.log.error(error));


// OTHER
// application
console.log('NODE APP UPTIME -', process.uptime());

// developer
si.versions() // kernal/node versions
    .then(data => console.log('VERSIONS -', data))
    .catch(error => console.error(error));

// http://unix.stackexchange.com/questions/43539/what-do-the-flags-in-proc-cpuinfo-mean
si.cpuFlags()
    .then(data => console.log('CPU FLAGS -', data))
    .catch(error => winston.log.error(error));


exports.getSystemInfo = (req, res) => {
  // send info from above as obj
}
