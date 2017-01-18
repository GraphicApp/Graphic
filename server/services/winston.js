const winston = require('winston'),
      fs = require('fs');
      settings = require('../services/settings');

const logDir = 'logs';
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const tsFormat = () => (new Date()).toLocaleTimeString();
function logFormat(options) {
  return '{'+ JSON.stringify('level') +':'+ JSON.stringify(options.level.toUpperCase()) + ',' + JSON.stringify('timestamp') +':'+ JSON.stringify(options.timestamp()) +','+ JSON.stringify('message') +':'+ JSON.stringify(options.message ? options.message : '') +
  (options.meta && Object.keys(options.meta).length ? (JSON.stringify('details')+':'+JSON.stringify(options.meta)) : '' )+'},';
}

const logLevel = settings.config.logLevel;
// levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'warn'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/log.json`,
      timestamp: tsFormat,
      level: logLevel,
      json: false,
      formatter: logFormat
    })
  ]
});



const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'warn'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/results.json`,
      timestamp: tsFormat,
      level: 'debug',
    })
  ]
});



module.exports = {
  dev: logger,
  log
}
