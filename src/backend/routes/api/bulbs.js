const express = require('express');
const router = express.Router();
const logger = require('../../tools/logger')
const bulbApi = require('../../domain/bulbs');

router.get('/', (req, res) => {
    res.json(bulbApi.getBulbs());
});

router.get('/refresh', async (req, res) => {
    res.json(await bulbApi.getRefreshedBulbs());
});

router.post('/', async (req, res) => {
    res.json(await bulbApi.setBulb(req.body));
});

module.exports = router;
