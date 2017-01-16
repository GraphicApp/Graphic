const fs = require('fs');

// dev settings
const defaultSettings = {
  logLevel: 'warn',
  modules: {
    cpu: {status: false, interval: 2000},
    processes: {status: false, interval: 10000},
    memory: {status: false, interval: 2000},
    temperature: {status: false, interval: 2000},
    fan: {status: false, interval: 2000},
    battery: {status: false, interval: 2000},
    disk: {status: false, interval: 2000},
    diskSpace: {status: false, interval: 3600*1000},
    network: {status: true, interval: 2000, iface: '', ping: ''},
    networkConnections: {status: false, interval: 3600*1000}
  },
};

// const defaultSettings = {
//   logLevel: 'warn',
//   modules: {
//     cpu: {status: true, interval: 2000},
//     processes: {status: false, interval: 10000},
//     memory: {status: true, interval: 2000},
//     temperature: {status: true, interval: 2000},
//     fan: {status: true, interval: 2000},
//     battery: {status: true, interval: 2000},
//     disk: {status: true, interval: 2000},
//     diskSpace: {status: true, interval: 3600*1000},
//     network: {status: true, interval: 2000, iface: '', ping: ''},
//     networkConnections: {status: false, interval: 3600*1000}
//   },
// };
const configFile = './server/services/config.json';

if (!fs.existsSync(configFile)) {
  console.log('Config file not found...');
  let saveConfig = JSON.stringify(defaultSettings, null, 4);
  console.log('Writing new config file with default settings...');
  try {
    fs.writeFileSync(configFile, saveConfig);
    console.log('New config file created successfully with default settings...');
  } catch (err) {
    console.error('Could not write new config file...', err);
    appSettings = defaultSettings;
    console.log('Using default settings.');
  }
}

exports.postSettings = (req, res) => {
  var appSettings = req.body.settings;
  let saveConfig = JSON.stringify(appSettings, null, 4);
  try {
    fs.writeFileSync(configFile, saveConfig);
    res.status(200).send();
    console.log('Settings saved successfully...');
  } catch (err) {
    console.error(`Could not save settings. ${err}`);
    rs.status(504).send(`Could not save settings. ${err}`);
  }
};

var loadConfig = fs.readFileSync(configFile), appSettings;
try {
  appSettings = JSON.parse(loadConfig);
  console.error('Settings parsed successfully from config file.');
}
catch (err) {
  console.error(`Error loading settings. Unable to parse config file... ${err}`);
  let saveConfig = JSON.stringify(defaultSettings, null, 4);
  try {
    fs.writeFileSync(configFile, saveConfig);
    console.log('New config file created with default settings.');
    appSettings = defaultSettings;
  } catch (err) {
    console.error('Could not write new config file...', err);
    appSettings = defaultSettings;
    console.log('Using default settings.');
  }
}

exports.getSettings = (req, res) => {
  res.status(200).send(appSettings);
}

exports.config = appSettings;
