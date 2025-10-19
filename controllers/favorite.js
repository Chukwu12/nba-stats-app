const FavoritePlayer = require('../models/favoritePlayer'); // Make sure this model exists
const axios = require('axios');

//environment variable key
const BALDONTLIE_API_KEY = process.env.NBA_API_KEY;
// const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// Render the favorite players page
exports.renderFavorites = async (req, res) => {
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

  try {
    // 1️⃣ Fetch player details
    const playerRes = await axios.get(`https://api.balldontlie.io/v1/players/${playerId}`, {
      headers: {
        Authorization: `${BALDONTLIE_API_KEY}`
      }
    });

    const player = playerRes.data.data;

    // 2️⃣ Fetch season stats
    const statsRes = await axios.get(`https://api.balldontlie.io/v1/season_averages`, {
      params: { 'player_ids[]': playerId },
      headers: {
        Authorization: `${BALDONTLIE_API_KEY}`
      }
    });

    const statData = statsRes.data.data[0] || {};

    const stats = {
      pts: statData.pts || 'N/A',
      ast: statData.ast || 'N/A',
      reb: statData.reb || 'N/A'
    };

    // 3️⃣ Optional: fetch image or use default
    const image = '/img/default.jpeg'; // Add real image support later if needed

    res.render('favorite-details', { player, stats, image });
  } catch (err) {
    console.error("❌ Error loading player details:", err.message);
    res.render('favorite-details', {
      player: null,
      stats: null,
      image: null,
      error: 'Could not load player details'
    });
  }
};

// Search player by name
exports.searchPlayer = async (req, res) => {
  const { playerName } = req.body;
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
    console.error("Error fetching player:", error.message);
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
