const express = require('express')
const app = express()
const path = require('path');



// Import routes
const playerRoutes = require('./routes/players');
const teamRoutes = require('./routes/teaminfo');
const injuryReportRoute = require("./routes/injuryReport");


// Load environment variables
require('dotenv').config();

// let db,
//     collection, // Define the collection variable
//     dbConnectionStr = process.env.DB_STRING,
//     dbName = 'basketball-teams'


//     MongoClient.connect(dbConnectionStr)
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`);
//         db = client.db(dbName);
//         collection = db.collection(dbName);
  





// Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Routes usage
app.use('/players', playerRoutes);  // for player details
app.use('/', teamRoutes);   
app.get('/', (req, res) => {
  res.render('index'); //  views/index.ejs
});
app.use('/injury-report', require('./routes/injuryReport')); // shows injury report
app.use("/api", require("./routes/players"));

// players.ejs page
// app.get("/players", (req, res) => {
//   res.render("players");
// });

const PORT = process.env.PORT || 2121;

app.listen(PORT, () => {
  console.log('Server is running, you better catch it!');
});


