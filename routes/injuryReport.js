// routes/injuryReport.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getInjuryData, getPlayerData } = require("../controllers/injury");

// Regular injury report page
router.get("/", async (req, res) => {
  try {
    const [playersResult, injuriesResult] = await Promise.all([
      getPlayerData(),
      getInjuryData()
    ]);

    const pageError = playersResult.error || injuriesResult.error || null;

    res.render("injury-report", {
      players: playersResult.players,
      injuries: injuriesResult.injuries,
      searchResults: null,
      search: null,
      error: pageError,
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

  if (!process.env.RAPIDAPI_KEY) {
    return res.render("injury-report", {
      players: [],
      injuries: [],
      searchResults: [],
      search: query,
      error: "RAPIDAPI_KEY is missing. Add it to your .env file to use injury search.",
    });
  }

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
    console.error("❌ Search error:", err.response?.status || err.message);
    const errorMessage = err?.response?.status === 401
      ? "Search API returned 401 Unauthorized. Check RAPIDAPI_KEY in .env."
      : "Search failed. Try again.";

    res.render("injury-report", {
      players: [],
      injuries: [],
      searchResults: [],
      search: query,
      error: errorMessage,
    });
  }
});

module.exports = router;
