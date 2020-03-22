const express = require('express');
const router = express.Router();
const deviceApi = require('../../domain/devices');

router.get('/', deviceApi.getDevices);

router.get('/refresh', deviceApi.refreshDevices);

router.delete('/clear', deviceApi.clearDevices);

router.post('/power', deviceApi.setDevice);

router.post('/power/batch', deviceApi.batchDevices);

module.exports = router;
