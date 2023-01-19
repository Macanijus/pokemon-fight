const express = require("express");
const { get } = require("mongoose");

const app = express.Router();

const {
  getAllPokemons,
  getOnePokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
  getPokemonInfo,
  getRandoPokemon,
} = require("../controllers/pokemonController");

app.route("/").get(getAllPokemons).post(createPokemon);

app.route("/:id").get(getOnePokemon).put(updatePokemon).delete(deletePokemon);

app.route("/:id/:info").get(getPokemonInfo);

app.route("/rando").getRandoPokemon;

module.exports = app;
