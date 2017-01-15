const app = require('../index'),
      settings = require('../services/settings');
// const api = require('./controllers/api'),
      // system = require('./controllers/system'),
      // cpu = require('./controllers/cpu'),
      // memory = require('./controllers/memory'),
      // temperature = require('./controllers/temperature'),
      // disk = require('./controllers/disk'),
      // network = require('./controllers/network');

app.get('/api/system/info', system.getSystemInfo);
app.get('/api/system/data', system.getSystemData);

app.get('/api/cpu/info', cpu.getCpuInfo);
app.get('/api/cpu/data', cpu.getCpuData);

app.get('/api/memory/info', memory.getMemoryInfo);
app.get('/api/memory/data', memory.getMemoryData);

app.get('/api/temperature/info', temperature.getTemperatureInfo);
app.get('/api/temperature/data', temperature.getTemperatureData);

app.get('/api/disk/info', disk.getDiskInfo);
app.get('/api/disk/data', disk.getDiskData);

app.get('/api/network/info', network.getNetworkInfo);
app.get('/api/network/data', network.getNetworkData);

app.get('/api/settings', settings.getSettings);
app.post('/api/settings', settings.postSettings);
