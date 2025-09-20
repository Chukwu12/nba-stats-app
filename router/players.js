// routes/player.js
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/players');


// Route to get all players (optional, can be placeholder)
router.get('/', (req, res) => {
    res.send('List of all players'); // or fetch from API if needed
  });
  
  // Route to get player by ID
  router.get('/:id', playerController.getPlayerById);

module.exports = router;
