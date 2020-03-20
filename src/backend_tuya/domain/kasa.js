const logger = require('log4js').getLogger('main');
const { Client } = require('tplink-smarthome-api');
const { Device } = require('../models/device');
const storage = require('../db/storage');

function refreshKasa() {
    let kasaDiscoveryClient = new Client();

    kasaDiscoveryClient.startDiscovery().on('device-new', async device => {
        let [sysInfo, powerState] = await Promise.all([
            device.getSysInfo(),
            device.getPowerState()
        ]);

        let d = new Device();
        d.alias = sysInfo.alias;
        d.id = sysInfo.deviceId;
        d.is_on = powerState;
        d.domain = {
            ip: device.host
        }

        logger.info('Refreshed name=%s is_on=%s', d.alias, d.is_on);
        storage.updateDevice(d);
    });
}

module.exports = {
    refreshKasa
};
