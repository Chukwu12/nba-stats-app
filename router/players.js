require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const DEFAULT_PLAYER_IMAGE = '/../public/img/default.jpeg';

// Helper to get player image URL
function getPlayerImage(player) {
  if (player.first_name && player.last_name) {
    return `https://nba-players.herokuapp.com/players/${player.last_name.toLowerCase()}/${player.first_name.toLowerCase()}`;
  }
  return DEFAULT_PLAYER_IMAGE;
}

// GET players page
router.get('/', (req, res) => {
  res.render('players-search', { player: null, error: null });
});

// POST search
router.post('/search', async (req, res) => {
  const searchQuery = req.body.playerName;
  if (!searchQuery) {
    return res.render('players-search', { player: null, error: 'Please enter a player name' });
  }

  try {
    const response = await axios.get('https://api.balldontlie.io/v1/players', {
      params: { search: searchQuery }
    });

    if (response.data.data.length === 0) {
      return res.render('players-search', { player: null, error: 'No player found' });
    }

    // For simplicity, take the first matching player
    const player = response.data.data[0];
    player.image = getPlayerImage(player);

    res.render('players-search', { player, error: null });
  } catch (error) {
    console.error('Error fetching player:', error.message);
    res.render('players-search', { player: null, error: 'Error fetching player data' });
  }
});

router.get('/search', (req, res) => {
  const query = req.query.name.toLowerCase();
  const player = Object.values(players).find(
    p => p.name.toLowerCase() === query
  );

  if (player) {
    res.render('player', { player });
  } else {
    res.render('player', { player: null, message: 'Player not found' });
  }
});


module.exports = router;
