const fs = require('fs');

const configFile = './server/services/config.json';
const defaultSettings = {
  logLevel: 'warn',
  modules: {
    cpu: {status: true, interval: 1000},
    processes: {status: false, interval: 2000},
    memory: {status: true, interval: 1000},
    temperature: {status: true, interval: 1000},
    fan: {status: true, interval: 1000},
    battery: {status: true, interval: 1000},
    disk: {status: true, interval: 1000},
    diskSpace: {status: true, interval: 3600*1000},
    network: {status: true, interval: 1000, iface: '', ping: ''},
    networkConnections: {status: false, interval: 3600*1000}
  },
};

if (!fs.existsSync(configFile)) {
  console.log('Config file not found');
  let saveConfig = JSON.stringify(defaultSettings, null, 4);
  fs.writeFileSync(configFile, saveConfig, function (err) {
    if (err) console.error(`Could not save settings. ${err.message}`);
    console.log('Writing new config file with default settings.')
  });
}

exports.postSettings = (req, res) => {
  var appSettings = req.body.settings;
  let saveConfig = JSON.stringify(appSettings);
  fs.writeFileSync(configFile, saveConfig, function (err) {
    if (err) {
      console.error(`Could not save settings. ${err.message}`);
      rs.status(504).send(`Could not save settings. ${err.message}`);
    }
    res.status(200).send();
    console.log('Settings saved successfully.');
  });
};

var loadConfig = fs.readFileSync(configFile), appSettings;
try {
  appSettings = JSON.parse(loadConfig);
  console.error('Settings parsed successfully from config file.');
}
catch (err) {
  console.error(`Error loading settings. Unable to parse config file. Loading the default settings instead. ${err}`);
  let saveConfig = JSON.stringify(defaultSettings);
  fs.writeFileSync(configFile, saveConfig, function (err) {
    if (err) console.error(`Could not save settings. ${err.message}`);
    console.log('Rewriting settings config to default parameters.')
  });
  appSettings = defaultSettings;
}

exports.getSettings = (req, res) => {
  res.status(200).send(appSettings);
  console.log('Settings loaded successfully.');
}

exports.config = appSettings;
