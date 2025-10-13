const express = require("express");
const axios = require("axios");
const router = express.Router();

const basketballTeam = require("../data/basketballTeam");

// GET /team-tracker
router.get("/team-tracker", (req, res) => {
  res.render("teamTracker", {
    info: null,
    infoName: null,
    logo: null,
    error: null
  });
});

// POST /findTeams
router.post("/findTeams", async (req, res) => {
  const teamName = req.body.teamName.toLowerCase();

  try {
    // 1️⃣ Fetch all NBA teams from balldontlie
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
      // 2️⃣ Find matching team in your local dataset
      const localStats = basketballTeam.find(
        team =>
          team.abbreviation.toLowerCase() === foundTeam.abbreviation.toLowerCase()
      );

      const enrichedTeam = {
        ...foundTeam,
        ...(localStats || {})
      };

      // 3️⃣ Try fetching the logo from RapidAPI
      let logoUrl = null;
      try {
         const logoResponse = await axios.get("https://nba-api-free-data.p.rapidapi.com/nba-team-logo", {
    params: { teamid: foundTeam.id }, // dynamic ID from Balldontlie
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "nba-api-free-data.p.rapidapi.com"
    },
  });

        if (logoResponse.data?.status === "success" && logoResponse.data.response?.logos?.length > 0) {
    // Use the primary logo on white background (best quality)
    const primaryLogo = logoResponse.data.response.logos.find(
      logo => logo.rel.includes("primary_logo_on_white_color")
    );

    logoUrl = primaryLogo?.href || logoResponse.data.response.logos[0].href;
  }
} catch (err) {
  console.warn("⚠️ Could not fetch logo from RapidAPI:", err.message);
}

      // 4️⃣ Render the team info page
      res.render("teamTracker", {
        info: enrichedTeam,
        infoName: foundTeam.full_name,
        logo: logoUrl,
        error: null
      });
    } else {
      res.render("teamTracker", {
        info: null,
        infoName: teamName,
        logo: null,
        error: "❌ Team not found. Please enter a valid NBA team name."
      });
    }

  } catch (err) {
    console.error("Error fetching team data:", err.message);
    res.render("teamTracker", {
      info: null,
      infoName: teamName,
      logo: null,
      error: "❌ Something went wrong while fetching team data."
    });
  }
});

module.exports = router;
