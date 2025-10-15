const axios = require("axios");
const FavoritePlayer = require('../models/favoritePlayer');

// environment variable key
const BALDONTLIE_API_KEY = process.env.NBA_API_KEY;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

exports.searchPlayer = async (req, res) => {
  const name = req.query.name; // from GET /players/search?name=
  console.log("🔎 Searching for player:", name);

  if (!name) {
    return res.render("players", { player: null, error: "Please enter a player name" });
  }

  // API URL
  const url = `https://api.balldontlie.io/v1/players`;
  console.log("Requesting:", `${url}?search=${name}`);

  try {
    const response = await axios.get(url, {
      params: { search: name },
      headers: {
        Authorization: `${process.env.NBA_API_KEY}`
      }
    });

    console.log("API response data:", response.data);

    if (response.data.data.length === 0) {
      return res.render("players", { player: null, error: "Player not found" });
    }

    const players = response.data.data;
    // Add images for each player
    players.forEach(p => {
      p.image = `https://nba-players.herokuapp.com/players/${p.last_name.toLowerCase()}/${p.first_name.toLowerCase()}`;
    });
    res.render("players", { players, error: null });
  } catch (err) {
    console.error(
      "Error fetching player:",
      err.response?.status,
      err.response?.data || err.message
    );
    res.render("players", { player: null, error: "Could not fetch player data. Try again." });
  }
};

exports.FavoritePlayer = async (req, res) => {
  try {
    const playerName = "LeBron James"; // Hardcoded for now — will later be user-selected

    // 1️⃣ Get player info
    const playerRes = await axios.get(`https://api.balldontlie.io/v1/players?search=${playerName}`);
    const player = playerRes.data.data[0];
    if (!player) return res.render('favorite-player', { error: 'Player not found', player: null, stats: null, image: null });

    // 2️⃣ Get season averages
    const seasonStats = await axios.get(`https://api.balldontlie.io/v1/season_averages?player_ids[]=${player.id}`);
    const statData = seasonStats.data.data[0] || {};
    const stats = {
      ppg: statData.pts || 'N/A',
      apg: statData.ast || 'N/A',
      rpg: statData.reb || 'N/A',
    };

    // 3️⃣ Get player image (NBA API)
    const nbaImageRes = await axios.get(`https://api-nba-v1.p.rapidapi.com/players/images?name=${player.first_name}%20${player.last_name}`, {
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
      }
    });
    const image = nbaImageRes.data?.response?.[0]?.image || '/images/default-player.png';

    // 4️⃣ Render everything
    res.render('favorite-player', { player, stats, image, error: null });

  } catch (error) {
    console.error('Error fetching favorite player:', error.message);
    res.render('favorite-player', { player: null, stats: null, image: null, error: 'Failed to load player data' });
  }
};


// 🔎 View player details (with stats + optional image)
exports.renderPlayerDetails = async (req, res) => {
  try {
    const playerId = req.params.id;

    // 1️⃣ Fetch player info
    const playerRes = await axios.get(`https://api.balldontlie.io/v1/players/${playerId}`, {
      headers: { Authorization: `${BALDONTLIE_API_KEY}` }
    });
    const player = playerRes.data;

    // 2️⃣ Fetch season averages
    const statsRes = await axios.get(`https://api.balldontlie.io/v1/season_averages`, {
      params: { 'player_ids[]': playerId },
      headers: { Authorization: `${BALDONTLIE_API_KEY}` }
    });
    const statData = statsRes.data.data[0] || {};

    const stats = {
      ppg: statData.pts || 'N/A',
      apg: statData.ast || 'N/A',
      rpg: statData.reb || 'N/A'
    };

    // 3️⃣ Fetch player image from RapidAPI (optional)
    let image = '/images/default-player.png';
    try {
      const imageRes = await axios.get(`https://api-nba-v1.p.rapidapi.com/players/images?name=${player.first_name}%20${player.last_name}`, {
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
      });
      image = imageRes.data?.response?.[0]?.image || image;
    } catch (imgErr) {
      console.warn("No image found for player:", player.first_name, player.last_name);
    }

    const favorite = await FavoritePlayer.findOne({ playerId });
    res.render('player-details', { player,  stats: stats || {}, image: image || '/img/default.jpeg', favorite, error: null });
  } catch (err) {
    console.error("Error rendering player details:", err.message);
    res.render('player-details', { player: null, stats: null, image: null, favorite: null, error: 'Could not load player details' });
  }
};