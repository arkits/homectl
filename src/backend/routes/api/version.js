const express = require('express');
const router = express.Router();

const version = require('../../domain/version');

router.get('/', (req, res) => {
    res.json(version.getVersion());
});

module.exports = router;
