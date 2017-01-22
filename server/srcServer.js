const path = require('path'),
      express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      winston = require('./services/winston'),
      webpack = require('webpack'),
      config = require('../webpack.config.dev'),
      compiler = webpack(config),
      settings = require('./services/settings'),
      port = settings.config.port;

const app = module.exports = express();
const pouchdb = require('./db/pouchdb'),
      postgres = require('./db/postgres'),
      api = require('./controllers/api');

app.use(cors());
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../public/src/index.html'));
});

// http.createServer(app)
app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Starting on ${port}`);
});
