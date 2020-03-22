var log4js = require('log4js');

log4js.configure({
    appenders: {
        main: {
            type: 'dateFile',
            filename: '../../logs/home-dash-backend.log',
            pattern: 'yyyy-MM-dd',
            daysToKeep: 1,
            layout: {
                type: 'pattern',
                pattern: '[%d] [%[%p%]] [%f:%l]: %m'
            }
        },
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
            appenders: ['main', 'out'],
            level: 'debug',
            enableCallStack: true
        }
    }
});

module.exports = log4js;
