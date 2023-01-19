const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config;
const mongoose = require("mongoose");
const connectDB = require("./dbinit");

connectDB();
//allow CORS in React
app.use(cors({ origin: true }));

const PORT = process.env.PORT;

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));

// pokemon routes
const pokemons = require("./routes/pokemonRoutes");

app.use(express.json());

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/pokemons", pokemons);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
