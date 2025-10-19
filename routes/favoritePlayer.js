const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite');

// Display favorite players
router.get('/', favoriteController.renderFavorites);

// Search for a player
router.post('/searchPlayer', favoriteController.searchPlayer);

// Add player to favorites
router.post('/addFavorite', favoriteController.addFavorite);

// Remove player from favorites
router.post('/removeFavorite', favoriteController.removeFavorite);

//Render favorite player details 
router.get('/:id', favoriteController.renderFavoriteDetails);

module.exports = router;
