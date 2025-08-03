const express = require('express');
const router = express.Router();

const basketballTeam = require('../data/basketballTeam'); // Adjust path if needed

// GET /team-tracker
router.get('/team-tracker', (req, res) => {
  res.render('teamTracker', { info: null, infoName: null }); 
});

// POST /findTeams
router.post('/findTeams', (req, res) => {
  const teamName = req.body.teamName;
  const teamInfo = basketballTeam[teamName] || null;
  res.render('teamTracker', { info: teamInfo, infoName: teamName });
});

// GET /
router.get('/', (req, res) => {
  res.render('index', { info: null, teams: basketballTeam });
});

module.exports = router;
