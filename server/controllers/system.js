const os = require('os'),
      process = require('process'),
      si = require('systeminformation'),
      winston = require('../services/winston'),
      settings = require('../services/settings');

if (settings.config.modules.battery.status) {
  setInterval(() => {
    si.battery()
        .then(data => console.log('battery', data))
        .catch(error => winston.log.error(error));
  }, settings.config.modules.battery.interval)
}




// (()=> {
//   console.log('HOST -', os.hostname());
// })();
// si.users()
//     .then(data => console.log('USERS -', data))
//     .catch(error => winston.log.error(error));
//
// si.cpu()
//     .then(data => console.log('CPU -', data))
//     .catch(error => winston.log.error(error));
//
// console.log(`TIMES - ${si.time()}`)
//
// // network interface
// si.networkInterfaceDefault()
//     .then(data => console.log(data))
//     .catch(error => winston.log.error(error));
//
// si.system()
//     .then(data => console.log('HARDWARE -', data))
//     .catch(error => winston.log.error(error));
//
// si.graphics()
//     .then(data => console.log('GRAPHICS -', data))
//     .catch(error => winston.log.error(error));
//
// si.osInfo()
//     .then(data => console.log('OS -', data))
//     .catch(error => winston.log.error(error));
//
//
// // OTHER
// // application
// console.log('node app uptime:', process.uptime());
//
// // developer
// si.versions() // kernal/node versions
//     .then(data => console.log('versions', data))
//     .catch(error => console.error(error));









// ##############################################

// let cpuFree = (callback) => getCPUUsage(callback, true);
// let cpuUsage = (callback) => getCPUUsage(callback, false);
//
// function getCPUUsage(callback, free) {
//
//   var stats1 = getCPUInfo();
//   var startIdle = stats1.idle;
//   var startTotal = stats1.total;
//
//   setTimeout(function() {
//       var stats2 = getCPUInfo();
//       var endIdle = stats2.idle;
//       var endTotal = stats2.total;
//
//       var idle 	= endIdle - startIdle;
//       var total 	= endTotal - startTotal;
//       var perc	= idle / total;
//
//       if(free === true)
//           callback( perc );
//       else
//           callback( (1 - perc) );
//
//   }, 1000 );
// }
//
// function getCPUInfo(callback){
//   var cpus = os.cpus();
//
//   var user = 0;
//   var nice = 0;
//   var sys = 0;
//   var idle = 0;
//   var irq = 0;
//   var total = 0;
//
//   for(var cpu in cpus){
//       if (!cpus.hasOwnProperty(cpu)) continue;
//       user += cpus[cpu].times.user;
//       nice += cpus[cpu].times.nice;
//       sys += cpus[cpu].times.sys;
//       irq += cpus[cpu].times.irq;
//       idle += cpus[cpu].times.idle;
//   }
//
//   var total = user + nice + sys + idle + irq;
//
//   return {
//       'idle': idle,
//       'total': total
//   };
// }

// cpuUsage(v => {
//   console.log( `CPU used: ${(v*100).toFixed(2)}%` );
// });
//
// cpuFree(v => {
//     console.log( `CPU free: ${(v*100).toFixed(2)}%` );
// });


// ###############################

// var exec = require('child_process').exec;
// var cmd = 'df -k';
// exec(cmd, function(err, stdout, stderr) {
//   if (err) console.log(err);
//   let total = 0,
//       used = 0,
//       free = 0,
//       lines = stdout.split("\n"),
//       str_disk_info = lines[1].replace( /[\s\n\r]+/g,' '),
//       disk_info = str_disk_info.split(' ');
//   total = (Math.ceil(disk_info[1] * 1024/ Math.pow(1024,2))/1000).toFixed(2);
//   used = (Math.ceil(disk_info[2] * 1024 / Math.pow(1024,2))/1000).toFixed(2);
//   free = (Math.ceil(disk_info[3] * 1024 / Math.pow(1024,2))/1000).toFixed(2);
//   console.log(`DISK - ${total} GB total | ${used} GB used (${(100*used/total).toFixed(2)}%), ${free} GB free (${(100*free/total).toFixed(2)}%)`);
// });
