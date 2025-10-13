const mongoose = require('mongoose');

const favoritePlayerSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  team: { type: String, required: true },
  position: { type: String },
  heightFeet: { type: Number },
  heightInches: { type: Number },
  weightPounds: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('FavoritePlayer', favoritePlayerSchema);
