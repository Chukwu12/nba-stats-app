router.get("/:id", async (req, res) => {
  const playerId = req.params.id;

  try {
    const response = await axios.get(`https://api.balldontlie.io/v1/players/${playerId}`, {
      headers: { Authorization: `${process.env.NBA_API_KEY}` }
    });

    const player = response.data;
    player.image = `https://nba-players.herokuapp.com/players/${player.last_name.toLowerCase()}/${player.first_name.toLowerCase()}`;

    res.render("playerDetail", { player });
  } catch (err) {
  
    console.error(err.message);
    res.redirect("/players");
  }
});
