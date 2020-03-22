const logger = require('log4js').getLogger('main');
const { refreshTuya, setTuya } = require('./tuya');
const { refreshKasa, setKasa } = require('./kasa');
const storage = require('../db/storage');

async function getDevices(_, res) {
    let devices = await storage.storage.getItem('devices');

    let marshalledDevices = [];

    for (var d in devices) {
        marshalledDevices.push(devices[d]);
    }

    logger.info('getDevices: Returning - ', marshalledDevices);
    res.json(marshalledDevices);
    return;
}

async function refreshDevices(_, res) {
    logger.info('Started refreshDevices');

    refreshTuya();
    refreshKasa();

    res.json({
        message: 'Started Refreshing Devices!'
    });

    return;
}

async function clearDevices(_, res) {
    await storage.clearDevices();

    res.json({
        message: 'Cleared Devices!'
    });

    return;
}

async function setDevice(req, res) {
    let is_on = req.body.is_on;
    let device = await storage.getDeviceFromId(req.body.id);

    logger.info('In setDevice - device=%s is_on=%s', device, is_on);

    switch (device.type) {
        case 'kasa':
            device = await setKasa(device, is_on);
            break;
        case 'tuya':
            device = await setTuya(device, is_on);
            break;
    }

    res.json(device);
    return;
}

async function batchDevices(req, res) {
    let is_on = req.body.is_on;
    logger.info('In batchDevices - is_on=%s', is_on);

    let devices = await storage.storage.getItem('devices');

    let deviceTogglePromises = [];

    for (var d in devices) {
        let device = devices[d];

        switch (device.type) {
            case 'kasa':
                device = setKasa(device, is_on);
                break;
            case 'tuya':
                device = setTuya(device, is_on);
                break;
        }

        deviceTogglePromises.push(device);
    }

    let devicesToReturn = await Promise.all(deviceTogglePromises);

    res.json(devicesToReturn);
    return;
}

module.exports = {
    getDevices,
    refreshDevices,
    clearDevices,
    setDevice,
    batchDevices
};
