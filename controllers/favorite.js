const FavoritePlayer = require('../models/favoritePlayer'); // Make sure this model exists
const axios = require('axios');
const mongoose = require('mongoose');

//environment variable key
const BALDONTLIE_API_KEY = process.env.NBA_API_KEY;
// const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

const isDatabaseReady = () => mongoose.connection.readyState === 1;

const getPlayerApiErrorMessage = (error) => {
  if (!BALDONTLIE_API_KEY) {
    return 'NBA API key is missing. Add NBA_API_KEY to your .env file.';
  }

  if (error?.response?.status === 401) {
    return 'NBA API request was unauthorized (401). Check your NBA_API_KEY in .env.';
  }

  if (error?.response?.status === 404) {
    return 'Player not found.';
  }

  return 'Could not load player details.';
};

// Render the favorite players page
exports.renderFavorites = async (req, res) => {
  if (!isDatabaseReady()) {
    return res.render('favorite-player', {
      player: null,
      favorites: [],
      error: 'Favorites are unavailable until MongoDB is configured.'
    });
  }

  try {
    // Get all favorites from MongoDB
    const favorites = await FavoritePlayer.find({});

    // Render page with favorites, no specific player yet
    res.render('favorite-player', { player: null, favorites, error: null });
  } catch (err) {
    console.error(err);
    res.render('favorite-player', { player: null, favorites: [], error: 'Could not load favorites' });
  }
};

// Render detailed view for a specific favorite player
exports.renderFavoriteDetails = async (req, res) => {
  const playerId = req.params.id;

  if (!BALDONTLIE_API_KEY) {
    return res.render('favorite-details', {
      player: null,
      stats: null,
      image: null,
      error: 'NBA API key is missing. Add NBA_API_KEY to your .env file.'
    });
  }

  try {
    // 1️⃣ Fetch player details
    const playerRes = await axios.get(`https://api.balldontlie.io/v1/players/${playerId}`, {
      headers: {
        Authorization: `${BALDONTLIE_API_KEY}`
      }
    });

    const player = playerRes.data;

    // 2️⃣ Fetch season stats
    const statsRes = await axios.get(`https://api.balldontlie.io/v1/season_averages`, {
      params: { 'player_ids[]': playerId },
      headers: {
        Authorization: `${BALDONTLIE_API_KEY}`
      }
    });

    const statData = statsRes.data.data[0] || {};

    const stats = {
      ppg: statData.pts || 'N/A',
      apg: statData.ast || 'N/A',
      rpg: statData.reb || 'N/A'
    };

    // 3️⃣ Optional: fetch image or use default
    const image = '/img/default.jpeg'; // Add real image support later if needed

    res.render('favorite-details', { player, stats, image });
  } catch (err) {
    console.error("❌ Error loading player details:", err.response?.status || err.message);
    res.render('favorite-details', {
      player: null,
      stats: null,
      image: null,
      error: getPlayerApiErrorMessage(err)
    });
  }
};

// Search player by name
exports.searchPlayer = async (req, res) => {
  const { playerName } = req.body;

  if (!BALDONTLIE_API_KEY) {
    return res.render('favorite-player', {
      player: null,
      favorites: [],
      error: 'NBA API key is missing. Add NBA_API_KEY to your .env file.'
    });
  }

  if (!isDatabaseReady()) {
    return res.render('favorite-player', {
      player: null,
      favorites: [],
      error: 'Favorites are unavailable until MongoDB is configured.'
    });
  }

  try {
    const response = await axios.get('https://api.balldontlie.io/v1/players', {
      params: { search: playerName },
      headers: {
        Authorization: `${BALDONTLIE_API_KEY}`
      }
    });

      const players = response.data.data;

       if (!players || players.length === 0) {
      return res.render('favorite-player', { player: null, favorites: [], error: 'Player not found' });
    }

    const player = players[0];
    const favorites = await FavoritePlayer.find({});

    if (response.data.data.length === 0) {
      return res.render('favorite-player', { player: null, favorites: [], error: 'Player not found' });
    }

    res.render('favorite-player', { player, favorites, error: null });
  } catch (error) {
    console.error("Error fetching player:", error.response?.status || error.message);
    const errorMessage = error?.response?.status === 401
      ? 'NBA API request was unauthorized (401). Check your NBA_API_KEY in .env.'
      : 'Error fetching player';
    res.render('favorite-player', { player: null, favorites: [], error: errorMessage });
  }
};

// Add player to favorites
exports.addFavorite = async (req, res) => {
  const { playerId, firstName, lastName, team, position, heightFeet, heightInches, weightPounds } = req.body;

  if (!isDatabaseReady()) {
    return res.redirect('/favorite-player');
  }

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

  if (!isDatabaseReady()) {
    return res.redirect('/favorite-player');
  }

  try {
    await FavoritePlayer.findOneAndDelete({ playerId });
    res.redirect('/favorite-player');
  } catch (error) {
    console.error(error);
    res.redirect('/favorite-player');
  }
};
