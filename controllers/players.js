const axios = require("axios");

// const API_BASE = "https://nba-api-free-data.p.rapidapi.com";
// const API_HEADERS = {
//   'x-rapidapi-key': process.env.RAPIDAPI_KEY,
//   'x-rapidapi-host': 'api-nba.p.rapidapi.com'
// };

// GET /players/search?name=LeBron
// exports.searchPlayer = async (req, res) => {
//   const name = req.query.search;
//   console.log("🔎 Searching for player:", name);

//   // Always pass search to EJS to avoid undefined errors
//   const searchValue = name || "";

//   if (!name) {
//     return res.render("players", { players: [], error: "Please enter a player name", search: searchValue });
//   }

//   try {
//     const response = await axios.get(`${API_BASE}/nba-players`, {
//       headers: API_HEADERS,
//       params: { name }
//     });

//     const playersRaw = response.data.response || []; // <-- API returns in `response`
//     const players = playersRaw.map(p => ({
//       id: p.id,
//       first_name: p.firstName,
//       last_name: p.lastName,
//       position: p.position || "N/A",
//       team: { full_name: p.team?.fullName || "N/A" },
//       image: p.image || "/img/default.jpeg"
//     }));

//     if (!players.length) {
//       return res.render("players", { players: [], error: "No player found.", search: searchValue });
//     }

//     res.render("players", { players, error: null, search: searchValue });
//   } catch (err) {
//     console.error("❌ Error fetching player:", err.message);
//     res.render("players", { players: [], error: "Could not fetch player data. Try again.", search: searchValue });
//   }
// };

// exports.getPlayerDetails = async (req, res) => {
//   const playerId = req.params.id;
//   console.log("🔎 Fetching details for player ID:", playerId);

//   try {
//     const response = await axios.get(`${API_BASE}/nba-player-stats`, {
//       headers: API_HEADERS,
//       params: { playerid: playerId }
//     });

//     const p = response.data.response; // Adjust based on API structure
//     if (!p) {
//       return res.render("player-details", { player: null, error: "Player not found." });
//     }

//     const player = {
//       id: p.id,
//       first_name: p.firstName,
//       last_name: p.lastName,
//       position: p.position || "N/A",
//       team: { full_name: p.team?.fullName || "N/A" },
//       height: p.height || "N/A",
//       weight: p.weight || "N/A",
//       college: p.college || "N/A",
//       draft_round: p.draftRound || "N/A",
//       image: p.image || "/img/default.jpeg"
//     };

//     res.render("player-details", { player, error: null });
//   } catch (err) {
//     console.error("❌ Error fetching player details:", err.message);
//     res.render("player-details", { player: null, error: "Could not fetch player details." });
//   }
// };
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