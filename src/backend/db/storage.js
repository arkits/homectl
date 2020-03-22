const storage = require('node-persist');
const logger = require('log4js').getLogger('main');

async function initializeStorage() {
    await storage.init();
    logger.info('Storage Initialized!');
    return;
}

async function updateDevice(d) {
    let devices = await storage.getItem('devices');

    if (devices == null) {
        devices = {};
    }

    devices[d.id] = d;

    await storage.setItem('devices', devices);

    return;
}

async function clearDevices() {
    logger.info('Cleared Devices!');
    await storage.setItem('devices', {});
    return;
}

async function getDeviceFromId(id) {
    let devices = await storage.getItem('devices');
    return devices[id];
}

module.exports = {
    storage,
    initializeStorage,
    updateDevice,
    clearDevices,
    getDeviceFromId
};
