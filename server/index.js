const path = require('path'),
      express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      winston = require('./services/winston'),
      settings = require('./services/settings'),
      port = process.env.PORT || settings.config.port;

import webpack from ('webpack');
import config from ('../webpack.config.dev');
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const compiler = webpack(config),

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});
app.use(wdm);
app.use(webpackHotMiddleware(compiler));
const argv = require('minimist')(process.argv.slice(2));

const app = module.exports = express();
const pouchdb = require('./db/pouchdb'),
      postgres = require('./db/postgres'),
      api = require('./controllers/api');

app.use(cors());
app.use(bodyParser.json());

app.use(require('webpack-hot-middleware')(compiler));
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

// http.createServer(app)
const server = app.listen(port, (err) => {
  if (err) return console.error(err);
  if (argv['start-hot']) {
    spawn('npm', ['run', 'start-hot'], { shell: true, env: process.env, stdio: 'inherit' })
      .on('close', code => process.exit(code))
      .on('error', spawnError => console.error(spawnError));
  }
  console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
