const os = require('os'),
      process = require('process'),
      request = require('request'),
      getip = require('../services/getip');


let cpuFree = (callback) => getCPUUsage(callback, true);
let cpuUsage = (callback) => getCPUUsage(callback, false);

function getCPUUsage(callback, free){

  var stats1 = getCPUInfo();
  var startIdle = stats1.idle;
  var startTotal = stats1.total;

  setTimeout(function() {
      var stats2 = getCPUInfo();
      var endIdle = stats2.idle;
      var endTotal = stats2.total;

      var idle 	= endIdle - startIdle;
      var total 	= endTotal - startTotal;
      var perc	= idle / total;

      if(free === true)
          callback( perc );
      else
          callback( (1 - perc) );

  }, 1000 );
}

function getCPUInfo(callback){
  var cpus = os.cpus();

  var user = 0;
  var nice = 0;
  var sys = 0;
  var idle = 0;
  var irq = 0;
  var total = 0;

  for(var cpu in cpus){
      if (!cpus.hasOwnProperty(cpu)) continue;
      user += cpus[cpu].times.user;
      nice += cpus[cpu].times.nice;
      sys += cpus[cpu].times.sys;
      irq += cpus[cpu].times.irq;
      idle += cpus[cpu].times.idle;
  }

  var total = user + nice + sys + idle + irq;

  return {
      'idle': idle,
      'total': total
  };
}

// cpuUsage(v => {
//   console.log( `CPU used: ${(v*100).toFixed(2)}%` );
// });
//
// cpuFree(v => {
//     console.log( `CPU free: ${(v*100).toFixed(2)}%` );
// });

getStats = () => {
  // system info
  console.log('HOST -', os.hostname());
  console.log(`OS - ${os.platform()} ${os.release()} ${os.arch()}`);
  console.log('uptime:', os.uptime());
  // cpu info
  console.log(`CPU - ${os.cpus().length} cores | ${os.cpus()[0].model} | ${os.cpus()[0].speed} MHz`);

  // cpu
  console.log(`LOAD avgs - 1min: ${os.loadavg()[0].toFixed(4)} | 5min: ${os.loadavg()[1].toFixed(4)} | 15min: ${os.loadavg()[2].toFixed(4)}`);
  console.log('CPU - times:', os.cpus()[0].times);
  // console.log(`CPU free: ${cpuFree()} | used: ${cpuUsage()}`);

  // memory
  console.log('MEMORY - free:', os.freemem() / ( 1024 * 1024 ));
  console.log('MEMORY - total:', os.totalmem() / ( 1024 * 1024 ));
  console.log('MEMORY - % free:', Math.ceil(os.freemem() / os.totalmem()).toFixed(2) + '%');

  // application
  console.log('node app uptime:', process.uptime());

  // network
  // console.log('network interfaces:', os.networkInterfaces());
  console.log(`NETWORK - internal ip: ${os.networkInterfaces().en0[0].address} | mac address: ${os.networkInterfaces().en0[0].mac}`);
  getip.v4().then(ip => console.log(`public ip: ${ip}`));
  // getip.v6().then(ip => console.log(ip));
}

// disk
var exec = require('child_process').exec;
var cmd = 'df -k';
exec(cmd, function(err, stdout, stderr) {
  if (err) console.log(err);
  let total = 0,
      used = 0,
      free = 0,
      lines = stdout.split("\n"),
      str_disk_info = lines[1].replace( /[\s\n\r]+/g,' '),
      disk_info = str_disk_info.split(' ');
  total = (Math.ceil(disk_info[1] * 1024/ Math.pow(1024,2))/1000).toFixed(2);
  used = (Math.ceil(disk_info[2] * 1024 / Math.pow(1024,2))/1000).toFixed(2);
  free = (Math.ceil(disk_info[3] * 1024 / Math.pow(1024,2))/1000).toFixed(2);
  console.log(`DISK - ${total} GB total | ${used} GB used (${(100*used/total).toFixed(2)}%), ${free} GB free (${(100*free/total).toFixed(2)}%)`);
});


// APPLE specific

const smc = require('../services/smc/smc');
Object.keys(smc.metrics).forEach(function(key) {
  var value = smc.get(key);
  if (value > 0) {
    console.log('TEMP -', key, smc.metrics[key]+':', value);
  }
});

var i, f = smc.fans();
for (i = 0; i < f; i++) {
  console.log('FAN -', 'F'+i+'Ac', 'Fan', i, 'RPM:', smc.fanRpm(i));
}



module.exports = {
  getStats: getStats
}
