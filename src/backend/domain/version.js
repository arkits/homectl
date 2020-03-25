const version = require('../config/version');
const logger = require('log4js').getLogger('main');

const getVersion = () => {
    logger.info('getVersion: Returning - %s', version);
    return version;
};

module.exports = {
    getVersion
};
