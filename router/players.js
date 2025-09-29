const express = require("express");
const axios = require("axios");
const router = express.Router();

// Route: List/Search players
router.get("/", async (req, res) => {
  const search = req.query.search || "";

  try {
    const response = await axios.get("https://api.balldontlie.io/v1/players?page=1&per_page=100", {
      headers: { Authorization: `Bearer ${process.env.NBA_API_KEY}` }
    });

    // Filter players by search
    const filteredPlayers = response.data.data.filter(player =>
      player.first_name.toLowerCase().includes(search.toLowerCase()) ||
      player.last_name.toLowerCase().includes(search.toLowerCase())
    );

    // Add image URLs
    filteredPlayers.forEach(p => {
      p.image = `https://nba-players.herokuapp.com/players/${p.last_name.toLowerCase()}/${p.first_name.toLowerCase()}`;
    });

    res.render("players", { players: filteredPlayers, search });
  } catch (err) {
    console.error(err.message);
    res.render("players", { players: [], search, error: "Could not fetch player data. Try again." });
  }
});

// Route: Player detail by ID
router.get("/:id", async (req, res) => {
  const playerId = req.params.id;
  console.log("🔍 Fetching player with ID:", playerId);

  try {
    const response = await axios.get(`https://api.balldontlie.io/v1/players/${playerId}`, {
      headers: { Authorization: `${process.env.NBA_API_KEY}` }
    });

    const player = response.data.data; // ✅ this is the actual player object
    console.log("✅ Player data received from API:", player);

    // Add image with fallback
    if (player.first_name && player.last_name) {
      player.image = `https://nba-players.herokuapp.com/players/${player.last_name.toLowerCase()}/${player.first_name.toLowerCase()}`;
    } else {
      player.image = "/images/placeholder-player.png";
    }

    res.render("player-detail", { player });

  } catch (err) {
    console.error("❌ Error fetching player:", err.message);
    res.redirect("/players");
  }
});

module.exports = router;
