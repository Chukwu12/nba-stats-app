const express = require('express')
const app = express()
const path = require('path');



// Import routes
const playerRoutes = require('./router/players');
const teamRoutes = require('./router/teaminfo');


// Load environment variables
require('dotenv').config({ path: './config/.env' });

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


// Routes
app.use('/players', playerRoutes);   // /players/:id
app.use('/', teamRoutes);   
app.get('/', (req, res) => {
  res.render('index'); // make sure you have views/index.ejs
});







const PORT = process.env.PORT || 2121;

app.listen(PORT, () => {
  console.log('Server is running, you better catch it!');
});


