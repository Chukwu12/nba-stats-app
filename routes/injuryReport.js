// routes/injuryReport.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getInjuryData, getPlayerData } = require("../controllers/injury");

// Regular injury report page
router.get("/", async (req, res) => {
  try {
    const players = await getPlayerData();
    const injuries = await getInjuryData();
    res.render("injury-report", {
      players,
      injuries,
      searchResults: null,
      search: null,
      error: null,
    });
  } catch (err) {
    console.error("❌ Error in /injury-report:", err.message);
    res.render("injury-report", {
      players: [],
      injuries: [],
      searchResults: null,
      search: null,
      error: "Failed to load injury report",
    });
  }
});

// Search functionality
router.get("/search", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.redirect("/injury-report");

  const options = {
    method: "GET",
    url: "https://sports-information.p.rapidapi.com/search",
    params: { query },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "sports-information.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const contents = response.data.results?.[0]?.contents || [];

    // Only NBA players
    const filtered = contents.filter(
      (p) => p.sport === "basketball" && p.subtitle?.includes("NBA")
    );

    res.render("injury-report", {
      players: [],
      injuries: [],
      searchResults: filtered,
      search: query,
      error: null,
    });
  } catch (err) {
    console.error("❌ Search error:", err.message);
    res.render("injury-report", {
      players: [],
      injuries: [],
      searchResults: [],
      search: query,
      error: "Search failed. Try again.",
    });
  }
});

module.exports = router;
