var express = require('express');
var expressWinston = require('express-winston');
var winston = require('winston');
const bodyParser = require('body-parser');
var logger = require('./tools/logger')

var app = express();

var port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use('/', require('./routes/api/version'));
app.use('/api/', require('./routes/api/version'));
app.use('/api/version', require('./routes/api/version'));

app.use('/api/bulbs', require('./routes/api/bulbs'));

// express-winston errorLogger makes sense AFTER the router.
app.use(
    expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.cli()
        )
    })
);

app.listen(port, () => {
    logger.info(`Smarthome-Dashboard/api running on ${port}!`);
});
