const app = require('../index'),
      settings = require('../services/settings');

const system = require('./system'),
      cpu = require('./cpu'),
      memory = require('./memory'),
      temperature = require('./temperature'),
      disk = require('./disk'),
      network = require('./network');

app.get('/api/system/info', system.getSystemInfo);

app.get('/api/cpu/data', cpu.getCpuData);

app.get('/api/services/:service', cpu.getServices);
app.get('/api/process/data', cpu.getProcesses);
app.get('/api/process/:process', cpu.getProcessLoad);

app.get('/api/memory/data', memory.getMemoryData);

app.get('/api/temperature/data', temperature.getTemperatureData);

app.get('/api/disk/data', disk.getDiskData);
app.get('/api/disk/dataspace', disk.getDiskSpaceData);

app.get('/api/network/data', network.getNetworkData);
app.get('/api/ip', network.getPublicIp);
app.get('/api/checkurl/:url', network.getCheckUrl);


app.get('/api/settings', settings.getSettings);
app.post('/api/settings', settings.postSettings);
