// Load environment variables
require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/database');


// Connect to MongoDB
connectDB();


// Import routes
const playerRoutes = require('./routes/players');
const teamRoutes = require('./routes/teaminfo');
const injuryReportRoute = require("./routes/injuryReport");
const favoritePlayerRoutes = require('./routes/favoritePlayer');




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
app.use('/players', playerRoutes);        // for player details
app.use('/', teamRoutes);                 // for team info
app.use('/favorite-player', favoritePlayerRoutes); // favorite platers
app.use('/injury-report', require('./routes/injuryReport')); // injury report
app.use('/api', require('./routes/players'));

app.get('/', (req, res) => {
  res.render('index'); // views/index.ejs
});

const PORT = process.env.PORT || 2121;

app.listen(PORT, () => {
  console.log('Server is running, you better catch it!');
});


