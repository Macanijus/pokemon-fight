const mongoose = require("mongoose");

const { Schema } = mongoose;

const PokemonSchema = new Schema({
  id: Number,
  name: {
    english: {
      type: String,
      // required: true,
    },
    japanese: {
      type: String,
      // required: true,
    },
    chinese: {
      type: String,
      // required: true,
    },
    french: {
      type: String,
      // required: true,
    },
  },
  type: [String],

  base: {
    HP: {
      type: Number,
      // required: true,
    },
    Attack: {
      type: Number,
      // required: true,
    },
    Defense: {
      type: Number,
      // required: true,
    },
    "Sp. Attack": {
      type: Number,
      // required: true,
    },
    "Sp. Defense": {
      type: Number,
      // required: true,
    },
    Speed: {
      type: Number,
      // required: true,
    },
  },
});

mongoose.model("pokemons", PokemonSchema);

module.exports = mongoose.model("Pokemon", PokemonSchema);
