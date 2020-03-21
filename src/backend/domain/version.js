const version = require('../config/version');
const logger = require('../tools/logger')

const getVersion = () => {
    logger.info('getVersion: Returning - %s', version);
    return version;
};

module.exports = {
    getVersion
};
