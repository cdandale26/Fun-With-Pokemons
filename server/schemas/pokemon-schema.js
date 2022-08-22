const mongoose = require("mongoose");

const pokemonSchema = mongoose.Schema({
  name: { type: String, unique: true },
  types: [],
  image_url: String,
});

module.exports = mongoose.model("pokemons", pokemonSchema);
