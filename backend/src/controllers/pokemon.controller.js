const {
	findAll,
	findAllFromUser,
	findOne,
	findOneFromUser,
	addOne,
	addType,
	// updateOneFromUser,
	// destroyOneFromUser,
} = require("../models/pokemon.model.js");

const getAll = async (req, res) => {
	try {
		const pokemons = await findAll();

		res.json(pokemons);
	} catch (e) {
		res.sendStatus(500);
	}
};

getAllFromUser = async (req, res) => {
	try {
		const userId = req.userId;
		const pokemons = await findAllFromUser(userId);

		res.json(pokemons);
	} catch (e) {
		console.error(e);
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
		console.error(e);
		res.sendStatus(500);
	}
};

const getOneFromUser = async (req, res) => {
	try {
		const userId = req.userId;
		const pokemonId = parseInt(req.params.id, 10);

		if (isNaN(pokemonId)) throw new Error("Invalid ID");

		const [pokemon] = await findOneFromUser(userId, pokemonId);

		res.json(pokemon);
	} catch (e) {
		console.error(e);
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

		const userId = req.userId;

		const newPokemon = await addOne(pokemon, userId, types);

		for (const typeId of types) {
			await addType(newPokemon.id, typeId);
		}

		res.json(newPokemon);
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}
};

// const patchOneFromUser = async (req, res) => {
// 	try {
// 		const userId = req.userId;
// 		const pokemonId = parseInt(req.params.id, 10);

// 		if (isNaN(pokemonId)) throw new Error("Invalid ID");

// 		const pokemon = req.body;
// 		const hp = parseInt(pokemon.hp, 10);
// 		const dmg = parseInt(pokemon.dmg, 10);
// 		const types = pokemon.types || [];

// 		if (!pokemon.name || isNaN(hp) || isNaN(dmg)) {
// 			throw new Error("Invalid data");
// 		}

// 		const [newPokemon] = await updateOneFromUser(userId, pokemonId, {
// 			name: pokemon.name,
// 			hp,
// 			dmg,
// 			types: pokemon.types,
// 			picture: pokemon.picture,
// 		});

// 		res.json(newPokemon);
// 	} catch (e) {
// 		console.error(e);
// 		res.sendStatus(500);
// 	}
// };

// const deleteOneFromUser = async (req, res) => {
// 	try {
// 		const userId = req.userId;
// 		const pokemonId = parseInt(req.params.id, 10);

// 		if (isNaN(pokemonId)) throw new Error("Invalid ID");

// 		const [pokemon] = await destroyOneFromUser(userId, pokemonId);

// 		res.json(pokemon);
// 	} catch (e) {
// 		console.error(e);
// 		res.sendStatus(500);
// 	}
// };

module.exports = {
	getAll,
	getAllFromUser,
	getOne,
	getOneFromUser,
	createOne,
	// patchOneFromUser,
	// deleteOneFromUser,
};
