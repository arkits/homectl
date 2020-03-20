const logger = require('log4js').getLogger('main');
const { refreshBulbs } = require('./bulbs');
const { refreshKasa } = require('./kasa');
const storage = require('../db/storage');

async function getDevices(req, res) {
    let devices = await storage.storage.getItem('devices');

    // logger.debug('getDevices: Devices in Storage - ', devices);

    let marshalledDevices = [];

    for (var d in devices) {
        marshalledDevices.push(devices[d]);
    }

    logger.info('getDevices: Returning - ', marshalledDevices);
    res.json(marshalledDevices);

    return;
}

async function refreshDevices(req, res) {
    logger.info('Started refreshDevices');

    refreshBulbs();
    refreshKasa();

    res.json({
        message: 'Started Refreshing Devices!'
    });

    return;
}

async function clearDevices(req, res) {

    await storage.clearDevices();

    res.json({
        message: 'Cleared Devices!'
    });

    return;
}

module.exports = {
    getDevices,
    refreshDevices,
    clearDevices
};
