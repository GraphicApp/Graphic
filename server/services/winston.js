const winston = require('winston'),
      fs = require('fs');
      settings = require('../services/settings');

const logDir = 'server/logs';
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const tsFormat = () => (new Date()).toLocaleTimeString();
function logFormat(options) {
  return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
  (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
}
// http://stackoverflow.com/questions/16010915/parsing-huge-logfiles-in-node-js-read-in-line-by-line

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
