const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var log4js = require('./tools/logger');
const storage = require('./db/storage');

var app = express();
var port = 8421;

var logger = log4js.getLogger('main');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use('/', require('./routes/api/version'));
app.use('/api/', require('./routes/api/version'));
app.use('/api/version', require('./routes/api/version'));
app.use('/api/devices', require('./routes/api/devices'));

storage.initializeStorage();

app.listen(port, () => {
    logger.info(`Smarthome-Dashboard/api running on ${port}!`);
});
