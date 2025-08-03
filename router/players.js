// routes/player.js
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/players');

router.get('/:id', playerController.getPlayerById);

module.exports = router;
