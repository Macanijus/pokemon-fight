const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb+srv://${process.env.LOGIN}:${process.env.PASS}@cluster0.apy0cso.mongodb.net/pokemons?retryWrites=true&w=majority`
  );
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
