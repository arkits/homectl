const express = require('express');
const router = express.Router();
const deviceApi = require('../../domain/devices');

router.get('/', deviceApi.getDevices);

router.get('/refresh', deviceApi.refreshDevices);

router.get('/clear', deviceApi.clearDevices);

module.exports = router;
