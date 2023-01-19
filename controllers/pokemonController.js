const Pokemons = require("../schemas/Pokemons");

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemons.find().select("name");
    res.status(200).json({
      success: true,
      pokemons,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOnePokemon = async (req, res) => {
  /* console.log(req.params.id); */
  try {
    const pokemon1 = await Pokemons.findById(req.params.id);
    const pokemon2 = await Pokemons.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json({
      success: true,
      pokemon1: pokemon1,
      pokemon2: pokemon2,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getRandoPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemons.rand();
    res.status(200).json({
      success: true,
      pokemon,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOnePokemonById = async (req, res) => {
  console.log(req.params.id);
  try {
    const pokemon = await Pokemons.where("id").equals(req.params.id);
    res.status(200).json({
      success: true,
      pokemon,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getPokemonInfo = async (req, res) => {
  console.log(req.params.id);
  try {
    const pokemonInfo = await Pokemons.findById(req.params.id).select(
      req.params.info
    );
    res.status(200).json({
      success: true,
      pokemonInfo,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getPokemonInfoById = async (req, res) => {
  console.log(req.params.id);
  try {
    const pokemonInfo = await Pokemons.where("id")
      .equals(req.params.id)
      .select(req.params.info);
    res.status(200).json({
      success: true,
      pokemonInfo,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createPokemon = async (req, res) => {
  try {
    const { name, type, base } = req.body;
    // console.log("req.body", req.body);
    const pokemon = await Pokemons.create({ name, type, base });
    res.status(201).json({
      success: true,
      pokemon,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updatePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemons.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, pokemon });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deletePokemon = async (req, res) => {
  try {
    await Pokemons.findByIdAndDelete(req.params.id);
    res.status(200).json({
      response: "Pokemon deleted successufully",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  getAllPokemons,
  getOnePokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
  getPokemonInfo,
  getRandoPokemon,
};
