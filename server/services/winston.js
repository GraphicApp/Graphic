const winston = require('winston'),
      fs = require('fs'),
      settings = require('../services/settings');

const logDir = 'logs';
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const tsFormat = () => (new Date()).toLocaleTimeString();

const logLevel = settings.config.logLevel;
// levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
exports.log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'warn'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/log.log`,
      level: logLevel,
      // timestamp: tsFormat
    })
  ]
});
