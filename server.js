const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 2121;
require('dotenv').config();

console.log('DB_STRING:', process.env.DB_STRING);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('PORT:', process.env.PORT);

let db, collection;
const dbConnectionStr = process.env.DB_STRING;
const dbName = process.env.DB_NAME;

MongoClient.connect(dbConnectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: true
})
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
        collection = db.collection('teams');

        app.set('view engine', 'ejs');
        app.use(express.static('public'));
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.get('/', (request, response) => {
            response.render('index.ejs', { info: null });
        });

        app.post('/findTeams', (request, response) => {
            const teamName = request.body.teamName.toLowerCase();
            collection.findOne({ teamName: { $regex: new RegExp(teamName, 'i') } })
                .then(team => {
                    if (team) {
                        response.render('index.ejs', { info: team });
                    } else {
                        response.render('index.ejs', { info: null });
                    }
                })
                .catch(error => console.error(error));
        });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));
