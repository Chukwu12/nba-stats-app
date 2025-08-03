// controllers/playerController.js
const axios = require('axios');

exports.getPlayerById = async (req, res) => {
  const playerId = req.params.id;

  try {
    const response = await axios.get(`https://www.balldontlie.io/api/v1/players/${playerId}`);
    const player = response.data;

    const playerImg = `https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`;

    res.render('player', { player, playerImg });
  } catch (error) {
    console.error('Error fetching player:', error.message);
    res.status(500).send('Error fetching player data');
  }
};
