// controllers/injuryController.js
const axios = require('axios');

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const NBA_API_KEY = process.env.NBA_API_KEY;

const getAuthError = (service, error) => {
  if (error?.response?.status === 401) {
    return `${service} request was unauthorized (401). Check API keys in .env.`;
  }

  return null;
};

async function getInjuryData() {
  if (!RAPIDAPI_KEY) {
    return {
      injuries: [],
      error: 'RAPIDAPI_KEY is missing. Add it to your .env file to load injury data.'
    };
  }

  const options = {
    method: 'GET',
    url: 'https://sports-information.p.rapidapi.com/nba/injuries',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': 'sports-information.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const raw = response.data.injuries || [];

    // Flatten all injuries across teams
    const injuries = raw.flatMap(team => team.injuries || []);
    return { injuries, error: null };
  } catch (error) {
    console.error('❌ Error fetching injury data:', error.response?.status || error.message);
    return {
      injuries: [],
      error: getAuthError('Injury API', error) || 'Could not load injury data right now.'
    };
  }
}

async function getPlayerData() {
  if (!NBA_API_KEY) {
    return {
      players: [],
      error: 'NBA_API_KEY is missing. Add it to your .env file to load player data.'
    };
  }

  try {
    const res = await axios.get("https://api.balldontlie.io/v1/players", {
      params: { per_page: 50 },
      headers: {
        Authorization: NBA_API_KEY
      }
    });

    const players = res.data.data.map(p => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      position: p.position || "N/A",
      team: p.team?.full_name || 'Free Agent',
      image: `https://nba-players.herokuapp.com/players/${p.last_name.toLowerCase()}/${p.first_name.toLowerCase()}`
    }));

    return { players, error: null };
  } catch (err) {
    console.error("❌ Error fetching balldontlie players:", err.response?.status || err.message);
    return {
      players: [],
      error: getAuthError('Players API', err) || 'Could not load player data right now.'
    };
  }
}

// 🔍 Search player injuries
async function searchInjuryByName(query) {
  if (!RAPIDAPI_KEY) {
    return {
      data: null,
      error: 'RAPIDAPI_KEY is missing. Add it to your .env file to use injury search.'
    };
  }

  const options = {
    method: 'GET',
    url: 'https://sports-information.p.rapidapi.com/search',
    params: { query },
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': 'sports-information.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("❌ Error in searchInjuryByName:", error.response?.status || error.message);
    return {
      data: null,
      error: getAuthError('Search API', error) || 'Could not search injury data right now.'
    };
  }
}

// ✅ Export both in the same object
module.exports = {
  getInjuryData,
  getPlayerData,
  searchInjuryByName
};
