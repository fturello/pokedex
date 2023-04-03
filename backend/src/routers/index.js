const express = require("express");

const pokemonRoutes = require("./pokemon.routes.js");
const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");

const authorization = require("../middlewares/auth.js");

const router = express.Router();

router.use("/pokemons", authorization, pokemonRoutes);
router.use("/users", userRoutes);
router.use(authRoutes);

module.exports = router;
