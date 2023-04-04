const express = require("express");

const {
	getAll,
	getAllFromUser,
	getOne,
	getOneFromUser,
	createOne,
	patchOneFromUser,
} = require("../controllers/pokemon.controller.js");

const { getAllTypes } = require("../controllers/types.controller.js");

const router = express.Router();

router.get("/", getAll);
router.get("/user-pokemons", getAllFromUser);
router.get("/types", getAllTypes);
router.get("/user/:id", getOneFromUser);
router.get("/:id", getOne);
router.post("/", createOne);
router.patch("/:id", patchOneFromUser);

module.exports = router;
