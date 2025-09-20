// controllers/playerController.js
const axios = require('axios');

exports.getPlayerById = async (req, res) => {
  const playerId = req.params.id;

  try {
    // Fetch player data from balldontlie API
    const response = await axios.get(`https://www.balldontlie.io/api/v1/players/${playerId}`);
    const player = response.data;

    // Construct player image URL
    let playerImg = null;
    if (player.first_name && player.last_name) {
      playerImg = `https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`;
    }

    // Fallback image (local or hosted)
    const fallbackImg = '/img/default-player.png'; // Put this in public/img/

    router.get('/', (req, res) => {
      res.render('player', { player: null });
    });
    

    if (error.response && error.response.status === 404) {
      return res.status(404).render('error', { message: 'Player not found' });
    }

    res.status(500).render('error', { message: 'Error fetching player data' });
  }
};
