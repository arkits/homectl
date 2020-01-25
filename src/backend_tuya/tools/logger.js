const winston = require('winston');

const myFormat = winston.format.printf(({level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
  });

const logger = (module.exports = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.timestamp(),
        myFormat
    )
}));


module.exports = logger;