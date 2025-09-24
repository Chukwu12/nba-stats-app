const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.query.search || "";
  try {
    const response = await axios.get(`https://api.balldontlie.io/v1/players?search=${search}`, {
      headers: { Authorization: `Bearer ${process.env.NBA_API_KEY}` }
    });
    res.render("players", { players: response.data.data, search });
  } catch (err) {
    console.error(err.message);
    res.render("players", { players: [], search });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(`https://api.balldontlie.io/v1/players/${req.params.id}`, {
      headers: { Authorization: `Bearer ${process.env.NBA_API_KEY}` }
    });
    res.render("player-detail", { player: response.data });
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Player not found");
  }
});

module.exports = router;
