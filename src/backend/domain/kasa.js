const logger = require('log4js').getLogger('main');
const { Client } = require('tplink-smarthome-api');
const { Device } = require('../models/device');
const storage = require('../db/storage');

let kasaDiscoveryClient = new Client();

function refreshKasa() {
    kasaDiscoveryClient.startDiscovery().on('device-new', async device => {
        let [sysInfo, powerState] = await Promise.all([
            device.getSysInfo(),
            device.getPowerState()
        ]);

        let d = new Device();
        d.alias = sysInfo.alias;
        d.id = sysInfo.deviceId;
        d.is_on = powerState;
        d.type = 'kasa';
        d.domain = {
            ip: device.host
        };

        logger.info('[kasa] Refreshed name=%s is_on=%s', d.alias, d.is_on);
        storage.updateDevice(d);
    });
}

async function setKasa(device, is_on) {
    let kasaDevice = await kasaDiscoveryClient.getDevice({
        host: device.domain.ip
    });

    if (is_on == null) {
        let currentPowerState = await kasaDevice.getPowerState();
        await kasaDevice.setPowerState(!currentPowerState);
        device.is_on = !currentPowerState;
    } else {
        await kasaDevice.setPowerState(is_on);
        device.is_on = is_on;
    }

    storage.updateDevice(device);

    return device;
}

module.exports = {
    refreshKasa,
    setKasa
};
