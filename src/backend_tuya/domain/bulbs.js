const bulbsConfig = require('../config/bulbs');
const tuyaPayloads = require('../tools/tuya_payloads');
const logger = require('../tools/logger');
const TuyAPI = require('tuyapi');

const getBulbs = () => {
    logger.info('getBulbs: Returning - %s ', bulbsConfig);
    return bulbsConfig;
};

const getRefreshedBulbs = async () => {
    logger.info('refreshBulbs: Refreshing Bulbs');

    refreshedBulbs = [];

    for (bulb of bulbsConfig) {
        refreshedBulbs.push(await refreshBulb(bulb));
    }

    return refreshedBulbs;
};

const refreshBulb = async bulb => {
    logger.info('Refreshing Bulb - %s', bulb['device_id']);

    refreshedBulb = {};
    refreshedBulb['device_id'] = bulb['device_id'];
    refreshedBulb['key'] = bulb['key'];

    try {
        const device = new TuyAPI({
            id: refreshedBulb['device_id'],
            key: refreshedBulb['key']
        });

        await device.find();
        await device.connect();

        let status = await device.get({
            schema: true
        });

        console.log(status);

        refreshedBulb['is_on'] = status['dps']['1'];
        refreshedBulb['mode'] = status['dps']['2'];
        refreshedBulb['brightness'] = status['dps']['3'];
        refreshedBulb['dps_payload'] = status['dps'];

        await device.disconnect();
    } catch (error) {
        logger.error(error);
    }

    return refreshedBulb;
};

const setBulb = async body => {
    logger.info('setBulbs: Received Params');
    console.log(body);

    try {

        const device = new TuyAPI({
            id: body['device_id'],
            key: body['key']
        });
        let stateHasChanged = false;

        // Find device on network
        device.find().then(() => {
          // Connect to device
          device.connect();
        });
        
        // Add event listeners
        device.on('connected', () => {
          console.log('Connected to device!');
        });
        
        device.on('disconnected', () => {
          console.log('Disconnected from device.');
        });
        
        device.on('error', error => {
          console.log('Error!', error);
        });
        
        device.on('data', data => {
          console.log('Data from device:', data);
        
          console.log(`Boolean status of default property: ${data.dps['1']}.`);
        
          // Set default property to opposite
          if (!stateHasChanged) {
            device.set({set: !(data.dps['1'])});
        
            // Otherwise we'll be stuck in an endless
            // loop of toggling the state.
            stateHasChanged = true;
          }
        });
        
        setTimeout(() => { device.disconnect(); }, 1000);

    } catch (error) {
        logger.error(error);
    }

    return body;
};

module.exports = {
    getBulbs,
    getRefreshedBulbs,
    setBulb
};
