const path = require('path'),
      express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      compression = require('compression'),
      winston = require('./services/winston'),
      settings = require('./services/settings'),
      port = settings.config.port;

const app = module.exports = express();
const pouchdb = require('./db/pouchdb'),
      postgres = require('./db/postgres'),
      api = require('./controllers/api');

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public/dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../public/src/index.html'));
});

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Starting on ${port}`);
});
