const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite');

// Render favorites page
router.get('/', favoriteController.renderFavorites);

// Search for a player
router.post('/searchPlayer', favoriteController.searchPlayer);

// Add player to favorites
router.post('/addFavorite', favoriteController.addFavorite);

// Remove player from favorites
router.post('/removeFavorite', favoriteController.removeFavorite);

module.exports = router;
