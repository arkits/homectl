const logger = require('log4js').getLogger('main');
const TuyAPI = require('tuyapi');

const tuyaPayloads = require('../tools/tuya_payloads');
const bulbsConfig = require('../config/bulbs');
const storage = require('../db/storage');

function refreshBulbs() {
    logger.info('Refreshing Bulbs');

    for (bulb of bulbsConfig) {
        refreshBulb(bulb).then(async refreshedBulb => {
            logger.info('Refreshed name=%s is_on=%s', refreshedBulb.alias, refreshedBulb.is_on);
            storage.updateDevice(refreshedBulb);
        });
    }

    return;
}

async function refreshBulb(bulb) {
    let refreshedBulb = {
        alias: bulb['name'],
        id: bulb['device_id'],
        domain: {
            key: bulb['key']
        }
    };

    try {
        const device = new TuyAPI({
            id: refreshedBulb['id'],
            key: refreshedBulb['domain']['key']
        });

        await device.find();
        await device.connect();

        let status = await device.get({
            schema: true
        });

        refreshedBulb['is_on'] = status['dps']['1'];
        refreshedBulb['domain']['mode'] = status['dps']['2'];
        refreshedBulb['domain']['brightness'] = status['dps']['3'];
        refreshedBulb['domain']['dps_payload'] = status['dps'];

        await device.disconnect();
    } catch (error) {
        logger.error(error);
    }

    return refreshedBulb;
}

module.exports = {
    refreshBulbs
};
