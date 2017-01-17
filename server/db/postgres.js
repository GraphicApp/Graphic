const massive = require('massive'),
      app = require('../index'),
      winston = require('../services/winston'),
      settings = require('../services/settings');

if (settings.config.db.postgres.status) {
  if (!settings.config.db.postgres.host) winston.log.error('A Postgres host is a required field.');
  if (!settings.config.db.postgres.user) winston.log.error('A Postgres user is a required field.');
  if (!settings.config.db.postgres.dbname) winston.log.error('A Postgres database is a required field.');

  let port = settings.config.db.postgres.port,
      portString = '';
  if (port !== 5432) portString = ':' + port.toString();
  mConfig = {
    user: settings.config.db.postgres.user,
    pass: settings.config.db.postgres.pass,
    host: settings.config.db.postgres.host,
    dbname: settings.config.db.postgres.dbname
  }

  let connectionString = `postgres://${mConfig.user}:${mConfig.pass}@${mConfig.host}${portString}/${mConfig.dbname}`;

  let createTable = massive.connectSync({
    connectionString: connectionString
  });

  createTable.run("CREATE TABLE IF NOT EXISTS sysinput(id SERIAL PRIMARY KEY not null, name VARCHAR(100) not null, value DECIMAL, time TIMESTAMP DEFAULT NOW())", (err, res) => {
    if (err) winston.log.error('Could not create/load Postgres table.', err);
    winston.log.info('Postgres table "sysinput" setup complete.');
  });

  const massiveInstance = massive.connectSync({
    connectionString: connectionString
  });

  app.set('db', massiveInstance);
  const db = app.get('db');
  let system = require('../controllers/system'),
        cpu = require('../controllers/cpu'),
        memory = require('../controllers/memory'),
        temperature = require('../controllers/temperature'),
        disk = require('../controllers/disk'),
        network = require('../controllers/network');

}
