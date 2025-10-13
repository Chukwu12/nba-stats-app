const FavoritePlayer = require('../models/favoritePlayer'); // Make sure this model exists
const axios = require('axios');

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// Render the favorite players page
exports.renderFavorites = async (req, res) => {
  try {
    // Get all favorites from MongoDB
    const favorites = await FavoritePlayer.find({});

    // Render page with favorites, no specific player yet
    res.render('favorite-player', { player: null, favorites, error: null });
  } catch (error) {
    console.error(error);
    res.render('favorite-player', { player: null, favorites: [], error: 'Could not load favorites' });
  }
};

// Search player by name
exports.searchPlayer = async (req, res) => {
  const { playerName } = req.body;
  try {
    const response = await axios.get('https://www.balldontlie.io/api/v1/players', {
      params: { search: playerName }
    });

    if (response.data.data.length === 0) {
      return res.render('favorite-player', { player: null, favorites: [], error: 'Player not found' });
    }

    const player = response.data.data[0]; // pick first match
    const favorites = await FavoritePlayer.find({});
    res.render('favorite-player', { player, favorites, error: null });
  } catch (error) {
    console.error(error);
    res.render('favorite-player', { player: null, favorites: [], error: 'Error fetching player' });
  }
};

// Add player to favorites
exports.addFavorite = async (req, res) => {
  const { playerId, firstName, lastName, team, position, heightFeet, heightInches, weightPounds } = req.body;

  try {
    const exists = await FavoritePlayer.findOne({ playerId });
    if (exists) {
      return res.redirect('/favorite-player');
    }

    const favorite = new FavoritePlayer({
      playerId,
      firstName,
      lastName,
      team,
      position,
      heightFeet,
      heightInches,
      weightPounds
    });

    await favorite.save();
    res.redirect('/favorite-player');
  } catch (error) {
    console.error(error);
    res.redirect('/favorite-player');
  }
};

// Remove player from favorites
exports.removeFavorite = async (req, res) => {
  const { playerId } = req.body;

  try {
    await FavoritePlayer.findOneAndDelete({ playerId });
    res.redirect('/favorite-player');
  } catch (error) {
    console.error(error);
    res.redirect('/favorite-player');
  }
};
