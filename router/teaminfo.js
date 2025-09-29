// router/teaminfo.js
const express = require('express');
const axios = require("axios");
const router = express.Router();

const basketballTeam = require("../data/basketballTeam");

// GET /team-tracker
router.get("/team-tracker", (req, res) => {
  res.render("teamTracker", {
    info: null,
    infoName: null,
    error: null
  });
});

// POST /findTeams
router.post("/findTeams", async (req, res) => {
  const teamName = req.body.teamName.toLowerCase();

  try {
    const response = await axios.get("https://api.balldontlie.io/v1/teams", {
      headers: {
        Authorization: process.env.NBA_API_KEY
      }
    });

    const teams = response.data.data;

    const foundTeam = teams.find(team =>
      team.full_name.toLowerCase() === teamName ||
      team.name.toLowerCase() === teamName ||
      team.abbreviation.toLowerCase() === teamName
    );

    if (foundTeam) {
      // Find matching team in local data by abbreviation
      const localStats = basketballTeam.find(
        team =>
          team.abbreviation.toLowerCase() === foundTeam.abbreviation.toLowerCase()
      );

      const enrichedTeam = {
        ...foundTeam,
        ...(localStats || {})
      };

      res.render("teamTracker", {
        info: enrichedTeam,
        infoName: foundTeam.full_name,
        error: null
      });
    } else {
      res.render("teamTracker", {
        info: null,
        infoName: teamName,
        error: "❌ Team not found. Please enter a valid NBA team name."
      });
    }

  } catch (err) {
    console.error("Error fetching team data:", err.message);
    res.render("teamTracker", {
      info: null,
      infoName: teamName,
      error: "❌ Something went wrong while fetching team data."
    });
  }
});

module.exports = router;
