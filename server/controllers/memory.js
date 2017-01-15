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




// (()=>{
//   console.log('MEMORY - free:', os.freemem() / ( 1024 * 1024 ));
//   console.log('MEMORY - total:', os.totalmem() / ( 1024 * 1024 ));
//   console.log('MEMORY - % free:', Math.ceil(os.freemem() / os.totalmem()).toFixed(2) + '%');
// })();
