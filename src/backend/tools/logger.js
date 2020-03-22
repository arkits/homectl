var log4js = require('log4js');

log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '[%d] [%[%p%]]: %m'
            }
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'debug',
            enableCallStack: true
        }
    }
});

module.exports = log4js;
