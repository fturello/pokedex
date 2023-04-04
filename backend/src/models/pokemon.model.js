const db = require("./db.js");

const findAll = async () => {
	try {
		const [pokemons] = await db.query("SELECT * FROM `pokemon`");

		return pokemons;
	} catch (e) {
		console.error(e);
	}
};

const findAllFromUser = async (userId) => {
	try {
		const [result] = await db.query(
			"SELECT u.username, p.id, p.name AS name, p.picture, p.hp, p.dmg, up.date_added, GROUP_CONCAT(DISTINCT t.name ORDER BY t.name ASC SEPARATOR ', ') AS type_name, GROUP_CONCAT(DISTINCT t.color ORDER BY t.name ASC SEPARATOR ', ') AS type_color FROM user_pokemon up JOIN pokemon p ON p.id = up.pokemon_id JOIN user u ON u.id = up.user_id JOIN pokemon_type pt ON pt.pokemon_id = p.id JOIN type t ON t.id = pt.type_id WHERE up.user_id = ? GROUP BY u.username, p.id, p.name, p.picture, p.hp, p.dmg, up.date_added ORDER BY up.date_added DESC;",
			[userId]
		);

		if (result.affectedRows === 0) {
			throw new Error("No pokemon found");
		}

		return result;
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

const findOneFromUser = async (userId, pokemonId) => {
	try {
		const [result] = await db.query(
			"SELECT u.username, p.id, p.name AS name, p.picture, p.hp, p.dmg, up.date_added, GROUP_CONCAT(DISTINCT t.name ORDER BY t.name ASC SEPARATOR ', ') AS type_name, GROUP_CONCAT(DISTINCT t.color ORDER BY t.name ASC SEPARATOR ', ') AS type_color FROM user_pokemon up JOIN pokemon p ON p.id = up.pokemon_id JOIN user u ON u.id = up.user_id JOIN pokemon_type pt ON pt.pokemon_id = p.id JOIN type t ON t.id = pt.type_id WHERE up.user_id = ? AND p.id = ? GROUP BY u.username, p.id, p.name, p.picture, p.hp, p.dmg, up.date_added ORDER BY up.date_added DESC;",
			[userId, pokemonId]
		);

		if (result.affectedRows === 0) {
			throw new Error("No pokemon found");
		}

		return result;
	} catch (e) {
		console.error(e);
	}
};

const addOne = async (pokemon, userId, types) => {
	try {
		const { name, hp, dmg } = pokemon;
		const picture = pokemon.picture
			? pokemon.picture
			: `${name.toLowerCase()}.svg`;

		const result = await db.query(
			"INSERT INTO `pokemon` (`name`, `picture`, `hp`, `dmg`) VALUES (?, ?, ?, ?)",
			[name, picture, hp, dmg]
		);

		if (result.affectedRows === 0) {
			throw new Error("Failed to add pokemon");
		}

		const ResultSetHeader = result[0];

		const pokemonId = ResultSetHeader.insertId;

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

const updateOneFromUser = async (userId, pokemonId, pokemon) => {
	try {
		const { name, hp, dmg } = pokemon;
		const picture = pokemon.picture
			? pokemon.picture
			: `${name.toLowerCase()}.svg`;

		await db.query(
			"UPDATE `pokemon` SET `name` = ?, `picture` = ?, `hp` = ?, `dmg` = ? WHERE `id` = ?",
			[name, picture, hp, dmg, pokemonId]
		);

		await db.query(
			"UPDATE `user_pokemon` SET `date_added` = NOW() WHERE `user_id` = ? AND `pokemon_id` = ?",
			[userId, pokemonId]
		);

		await db.query("DELETE FROM `pokemon_type` WHERE `pokemon_id` = ?", [
			pokemonId,
		]);

		console.log(pokemon.types);
		for (const typeName of pokemon.types) {
			const type = await db.query(
				"SELECT `id` FROM `type` WHERE `name` = ?",
				typeName
			);

			if (type.length === 0) {
				throw new Error(`Type '${typeName}' not found`);
			}

			const typeId = type[0][0].id;

			console.log(typeId);

			await db.query(
				"INSERT INTO `pokemon_type` (`pokemon_id`, `type_id`) VALUES (?, ?)",
				[pokemonId, typeId]
			);
		}
	} catch (e) {
		console.error(e);
	}
};

module.exports = {
	findAll,
	findAllFromUser,
	findOne,
	findOneFromUser,
	addOne,
	addType,
	updateOneFromUser,
};
