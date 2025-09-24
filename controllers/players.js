// controllers/players.js
const axios = require("axios");

exports.searchPlayer = async (req, res) => {
  const name = req.query.name; // from GET /players/search?name=
  console.log("🔎 Searching for player:", name);

  if (!name) {
    return res.render("players", { player: null, error: "Please enter a player name" });
  }

  // Correct API URL
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
