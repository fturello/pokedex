const express = require("express");

const {
	getAll,
	getOne,
	createOne,
} = require("../controllers/pokemon.controller.js");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", createOne);

module.exports = router;
