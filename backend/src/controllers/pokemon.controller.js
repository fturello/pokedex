const {
	findAll,
	findOne,
	addOne,
	addType,
} = require("../models/pokemon.model.js");

const getAll = async (req, res) => {
	try {
		const pokemons = await findAll();

		res.json(pokemons);
	} catch (e) {
		res.sendStatus(500);
	}
};

const getOne = async (req, res) => {
	try {
		const pokemonId = parseInt(req.params.id, 10);

		if (isNaN(pokemonId)) throw new Error("Invalid ID");

		const [pokemon] = await findOne(pokemonId);

		res.json(pokemon);
	} catch (e) {
		res.sendStatus(500);
	}
};

const createOne = async (req, res) => {
	try {
		const pokemon = req.body;
		const hp = parseInt(pokemon.hp, 10);
		const dmg = parseInt(pokemon.dmg, 10);
		const types = pokemon.types || [];

		if (!pokemon.name || !pokemon || isNaN(hp) || isNaN(dmg)) {
			throw new Error("Invalid data");
		}

		console.log(req.userId);

		const userId = req.userId;

		const newPokemon = await addOne(pokemon, userId, types);

		for (const typeId of types) {
			await addType(newPokemon.id, typeId);
		}

		res.json(newPokemon);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
};

module.exports = { getAll, getOne, createOne };
