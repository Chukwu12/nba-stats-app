// controllers/injuryController.js
const axios = require('axios');

async function getInjuryData() {
  const options = {
    method: 'GET',
    url: 'https://sports-information.p.rapidapi.com/nba/injuries',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'sports-information.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const raw = response.data.injuries || [];

    // Flatten all injuries across teams
    const injuries = raw.flatMap(team => team.injuries || []);
    return injuries;
  } catch (error) {
    console.error('❌ Error fetching injury data:', error.message);
    return [];
  }
}

async function getPlayerData() {
  try {
    const res = await axios.get("https://api.balldontlie.io/v1/players", {
      params: { per_page: 50 },
      headers: {
        Authorization: process.env.NBA_API_KEY // If required by your key
      }
    });

    return res.data.data.map(p => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      position: p.position || "N/A",
      team: p.team?.full_name || 'Free Agent',
      image: `https://nba-players.herokuapp.com/players/${p.last_name.toLowerCase()}/${p.first_name.toLowerCase()}`
    }));
  } catch (err) {
    console.error("❌ Error fetching balldontlie players:", err.message);
    return [];
  }
}

// 🔍 Search player injuries
async function searchInjuryByName(query) {
  const options = {
    method: 'GET',
    url: 'https://sports-information.p.rapidapi.com/search',
    params: { query },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'sports-information.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data; // optionally filter here
  } catch (error) {
    console.error("❌ Error in searchInjuryByName:", error.message);
    return null;
  }
}

// ✅ Export both in the same object
module.exports = {
  getInjuryData,
  getPlayerData,
  searchInjuryByName
};
