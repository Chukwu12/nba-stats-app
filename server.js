const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 2121;
require('dotenv').config()



let db,
    collection, // Define the collection variable
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'basketball-teams'


    MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
        collection = db.collection(dbName);
    })
    .catch(error => console.error(error));



const basketballTeam = {
    'Atlanta Hawks': {
        'championships': 0,
        'Most 3s': 'Trae Young',
        'best Record': '60-22'
    },
    'Boston Celtics': {
        'championships': 17,
        'Most 3s': 'Jayson Tatum',
        'best Record': '68-14'
    },
    'Brooklyn Nets': {
        'championships': 0,
        'Most 3s': 'James Harden',
        'best Record': '58-24'
    },
    'Charlotte Hornets': {
        'championships': 0,
        'Most 3s': 'Terry Rozier',
        'best Record': '54-28'
    },
    'Chicago Bulls': {
        'championships': 6,
        'Most 3s': 'Zach LaVine',
        'best Record': '72-10'
    },
    'Cleveland Cavaliers': {
        'championships': 1,
        'Most 3s': 'Darius Garland',
        'best Record': '66-16'
    },
    'Dallas Mavericks': {
        'championships': 1,
        'Most 3s': 'Luka Dončić',
        'best Record': '67-15'
    },
    'Denver Nuggets': {
        'championships': 0,
        'Most 3s': 'Jamal Murray',
        'best Record': '57-25'
    },
    'Detroit Pistons': {
        'championships': 3,
        'Most 3s': 'Jerami Grant',
        'best Record': '64-18'
    },
    'Golden State Warriors': {
        'championships': 6,
        'Most 3s': 'Stephen Curry',
        'best Record': '73-9'
    },
    'Houston Rockets': {
        'championships': 2,
        'Most 3s': 'Kevin Porter Jr.',
        'best Record': '65-17'
    },
    'Indiana Pacers': {
        'championships': 0,
        'Most 3s': 'Malcolm Brogdon',
        'best Record': '56-26'
    },
    'Los Angeles Clippers': {
        'championships': 0,
        'Most 3s': 'Paul George',
        'best Record': '61-21'
    },
    'Los Angeles Lakers': {
        'championships': 17,
        'Most 3s': 'LeBron James',
        'best Record': '69-13'
    },
    'Memphis Grizzlies': {
        'championships': 0,
        'Most 3s': 'Ja Morant',
        'best Record': '50-32'
    },
    'Miami Heat': {
        'championships': 3,
        'Most 3s': 'Tyler Herro',
        'best Record': '66-16'
    },
    'Milwaukee Bucks': {
        'championships': 2,
        'Most 3s': 'Giannis Antetokounmpo',
        'best Record': '68-14'
    },
    'Minnesota Timberwolves': {
        'championships': 0,
        'Most 3s': 'Anthony Edwards',
        'best Record': '49-33'
    },
    'New Orleans Pelicans': {
        'championships': 0,
        'Most 3s': 'Zion Williamson',
        'best Record': '48-34'
    },
    'New York Knicks': {
        'championships': 2,
        'Most 3s': 'Donte DiVincenzo',
        'best Record': '60-22'
    },
    'Oklahoma City Thunder': {
        'championships': 1,
        'Most 3s': 'Shai Gilgeous-Alexander',
        'best Record': '60-22'
    },
    'Orlando Magic': {
        'championships': 0,
        'Most 3s': 'Cole Anthony',
        'best Record': '59-23'
    },
    'Philadelphia 76ers': {
        'championships': 3,
        'Most 3s': 'Joel Embiid',
        'best Record': '65-17'
    },
    'Phoenix Suns': {
        'championships': 0,
        'Most 3s': 'Devin Booker',
        'best Record': '62-20'
    },
    'Portland Trail Blazers': {
        'championships': 1,
        'Most 3s': 'Damian Lillard',
        'best Record': '63-19'
    },
    'Sacramento Kings': {
        'championships': 0,
        'Most 3s': 'De Aaron Fox',
        'best Record': '55-27'
    },
    'San Antonio Spurs': {
        'championships': 5,
        'Most 3s': 'DeMar DeRozan',
        'best Record': '67-15'
    },
    'Toronto Raptors': {
        'championships': 1,
        'Most 3s': 'Fred VanVleet',
        'best Record': '59-23'
    },
    'Utah Jazz': {
        'championships': 0,
        'Most 3s': 'Donovan Mitchell',
        'best Record': '64-18'
    },
    'Washington Wizards': {
        'championships': 1,
        'Most 3s': 'Bradley Beal',
        'best Record': '59-23'
    },
    'Unknown': {
        'championships': 'unknown',
        'Most 3s': 'unknown',
        'best Record': 'unknown' 
    },
    'MyTeam': {
        'championships': 6,
        'Most 3s': 'Okechukwu Egeruoh',
        'best Record': '77-5'
    }

};



    // function insertBasketballTeams() {
    //     // Insert each team into the collection
    //     for (const [teamName, teamInfo] of Object.entries(basketballTeam)) {
    //         collection.insertOne({
    //            teamName,
    //             teamInfo
    //        })
    //        .then(result => {
    //         console.log(`Inserted ${teamName} into the collection`);
    //     })
    //     .catch(error => console.error(error));
    // }
    // }
       
       
    //    // Call the function to insert basketball teams
    //    insertBasketballTeams();
       

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (request, response) => {
    response.render('index.ejs', { info: null });
});


app.post('/findTeams', (request, response) => {
    
    const teamName = request.body.teamName.toLowerCase(); // Convert user input to lowercase
    collection.findOne({ teamName: { $regex: new RegExp(teamName, 'i') } }) // Use case-insensitive regex search
        .then(team => {
            if (team) {
                response.render('index.ejs', { info: team });
            } else {
                response.render('index.ejs', { info: null }); // Team not found
            }
        })
        .catch(error => console.error(error));
});






// app.put('/addOneLike', (request, response) => {
//     db.collection('rappers').updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS,likes: request.body.likesS},{
//         $set: {
//             likes:request.body.likesS + 1
//           }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     })
//     .then(result => {
//         console.log('Added One Like')
//         response.json('Like Added')
//     })
//     .catch(error => console.error(error))

// })

// app.delete('/deleteRapper', (request, response) => {
//     db.collection('rappers').deleteOne({stageName: request.body.stageNameS})
//     .then(result => {
//         console.log('Rapper Deleted')
//         response.json('Rapper Deleted')
//     })
//     .catch(error => console.error(error))

// })

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})