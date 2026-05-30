# NBA Stats App

<p align="center">
	<img src="public/img/basketball-img.jpg" alt="NBA Stats App icon" width="120" />
</p>

<p align="center">
	<a href="#"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white"></a>
	<a href="#"><img alt="Express" src="https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white"></a>
	<a href="#"><img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white"></a>
	<a href="#"><img alt="EJS" src="https://img.shields.io/badge/View-EJS-B4CA65"></a>
	<a href="#"><img alt="Tailwind CSS" src="https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?logo=tailwindcss&logoColor=white"></a>
	<a href="https://opensource.org/license/isc-license-txt"><img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-blue.svg"></a>
	<a href="https://render.com/"><img alt="Deploy on Render" src="https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render&logoColor=000000"></a>
</p>

A full-stack NBA tracker where users can browse teams and players, view injury and player details, and save favorite players.

## Highlights

- Browse NBA teams and player information.
- View details such as championships, key player stats, and team records.
- Search and track data quickly from the UI.
- Save favorite players for quick access.
- Server-rendered pages with EJS for a fast, simple UX.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS
- Tailwind CSS
- Vanilla JavaScript

## Project Structure

```text
config/        Database connection setup
controllers/   Route controller logic
models/        Mongoose models
public/        Static assets (CSS, JS, images)
routes/        Express route definitions
views/         EJS templates and partials
server.js      App entry point
```

## Getting Started

### 1. Clone and install

```bash
git clone <repository-url>
cd nba-stats-app
npm install
```

### 2. Create environment variables

Create a `.env` file in the project root:

```env
DB_STRING=<your-mongodb-connection-string>
```

### 3. Run the app

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

Open http://localhost:2121 in your browser.

## Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon
- `npm run build:css` - Build/watch Tailwind output

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.
