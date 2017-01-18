const os = require('os'),
      si = require('systeminformation'),
      winston = require('../services/winston'),
      settings = require('../services/settings'),
      app = require('../index'),
      db = app.get('db'),
      pdb = require('../db/pouchdb');

if (settings.config.modules.battery.status) {
  let module = 'battery';
  setInterval(() => {
    si.battery()
        .then(data => {
          if (data.hasbattery) {
            if (settings.config.db.pouchdb.status || settings.config.db.couchdb.status) {
              let obj = {};
              obj.time = new Date().getTime();
              obj.name = module;
              obj.value = data;
              pdb.store(obj);
            }
            if (settings.config.db.postgres.status) {
              for (let prop in data) {
                if (data.hasOwnProperty(prop) && prop !== 'hasbattery') {
                  if (typeof(data[prop]) === 'boolean') {
                    data[prop] = data[prop] ? 1 : 0;
                  }
                  let values = {
                    name: module +'.'+ prop,
                    value: data[prop]
                  }
                  db.graphicdb.insert(values, (err, article) => {
                    if (err) winston.log.error(err);
                    winston.log.info('New data stored in', module)
                  });
                }
              }
            }
          }
        })
        .catch(error => winston.log.error(error));
  }, settings.config.modules.battery.interval);
}

exports.getSystemInfo = () => {
  if (settings.config.modules.system.status) {
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
    si.fsSize()
      .then(data => console.log(data.type, data.mount))
      .catch(error => winston.log.error(error));
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
  } else {
    winston.log.info('System information has been turned off by the user and cannot be retrieved.');
  }
}
