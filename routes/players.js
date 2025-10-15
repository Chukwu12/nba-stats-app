const express = require("express");
const axios = require("axios");
const router = express.Router();
const playerController = require("../controllers/players");



// balldontlie api's
router.get("/", async (req, res) => {
  const search = req.query.search || "";

  try {
    const response = await axios.get(`https://api.balldontlie.io/v1/players?search=${search}`, {
      headers: { Authorization: `${process.env.NBA_API_KEY}` } // not required for BallDon’tLie but safe to keep
    });

    const players = response.data.data.map(p => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      position: p.position || "N/A",
      team: p.team ? p.team.full_name : "N/A",
      image: `https://nba-players.herokuapp.com/players/${p.last_name.toLowerCase()}/${p.first_name.toLowerCase()}`
    }));

    res.render("players", { players, search, error: null });
  } catch (err) {
    console.error("❌ Error fetching players:", err.message);
    res.render("players", { players: [], search, error: "Could not load players." });
  }
});

// Player detail route
// router.get("/:id", async (req, res) => {
//   const playerId = req.params.id;

//   try {
//     const response = await axios.get(`https://api.balldontlie.io/v1/players/${playerId}`, {
//       headers: { Authorization: `${process.env.NBA_API_KEY}` }
//     });

//     const p = response.data.data; // correct field
//     if (!p) return res.status(404).render("player-detail", { player: null, error: "Player not found" });

//     const player = {
//       id: p.id,
//       first_name: p.first_name,
//       last_name: p.last_name,
//       position: p.position || "N/A",
//       team: p.team ? p.team.full_name : "N/A",
//       height: p.height || "N/A",
//       weight: p.weight || "N/A",
//       jersey_number: p.jersey_number || "N/A",
//       college: p.college || "N/A",
//       image: `https://nba-players.herokuapp.com/players/${p.last_name.toLowerCase()}/${p.first_name.toLowerCase()}`
//     };

//     res.render("player-detail", { player, error: null });
//   } catch (err) {
//     console.error("❌ Error fetching player details:", err.message);
//     res.status(500).render("player-detail", { player: null, error: "Could not fetch player details." });
//   }
// });

//fetch favorite player data
router.get("/favorite", playerController.FavoritePlayer);

// Full player detail page
router.get('/:id', playerController.renderPlayerDetails);




module.exports = router;
