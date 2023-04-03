const db = require("./db.js");

const findAll = async () => {
	try {
		const [pokemons] = await db.query("SELECT * FROM `pokemon`");

		return pokemons;
	} catch (e) {
		console.error(e);
	}
};

const findOne = async (id) => {
	try {
		const [pokemon] = await db.query("SELECT * FROM `pokemon` WHERE `id` = ?", [
			id,
		]);

		return pokemon;
	} catch (e) {
		console.error(e);
	}
};

const addOne = async (pokemon, userId, types) => {
	try {
		const { name, hp, dmg } = pokemon;
		const picture = `${name.toLowerCase()}.png`;

		const result = await db.query(
			"INSERT INTO `pokemon` (`name`, `picture`, `hp`, `dmg`) VALUES (?, ?, ?, ?)",
			[name, picture, hp, dmg]
		);

		if (result.affectedRows === 0) {
			throw new Error("Failed to add pokemon");
		}

		const ResultSetHeader = result[0];

		const pokemonId = ResultSetHeader.insertId;

		console.log("pokemon id :", pokemonId);

		await db.query(
			"INSERT INTO `user_pokemon` (`user_id`, `pokemon_id`) VALUES (?, ?)",
			[userId, pokemonId]
		);

		for (const typeName of types) {
			const type = await db.query(
				"SELECT `id` FROM `type` WHERE `name` = ?",
				typeName
			);

			if (type.length === 0) {
				throw new Error(`Type '${typeName}' not found`);
			}

			const typeId = type[0][0].id;
			console.log("type id ==", typeId);

			await db.query(
				"INSERT INTO `pokemon_type` (`pokemon_id`, `type_id`) VALUES (?, ?)",
				[pokemonId, typeId]
			);
		}

		return { id: result.insertId, name, picture, hp, dmg, types };
	} catch (e) {
		console.error(e);
	}
};
const addType = async (pokemonId, typeId) => {
	try {
		const result = await db.query(
			"INSERT INTO `pokemon_type` (`pokemon_id`, `type_id`) VALUES (?, ?)",
			[pokemonId, typeId]
		);

		if (result.affectedRows === 0) {
			throw new Error("Failed to add type to pokemon");
		}
	} catch (e) {
		console.error(e);
	}
};

module.exports = { findAll, findOne, addOne, addType };
