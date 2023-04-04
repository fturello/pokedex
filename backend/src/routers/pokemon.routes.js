const express = require("express");

const {
	getAll,
	getAllFromUser,
	getOne,
	getAllTypes,
	createOne,
} = require("../controllers/pokemon.controller.js");

const router = express.Router();

router.get("/", getAll);
router.get("/user-pokemons", getAllFromUser);
router.get("/:id", getOne);
router.get("/types", getAllTypes);
router.post("/", createOne);

module.exports = router;
