import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import pokemonAPI from "../services/pokemonAPI.js";

import styles from "../styles/pages/Pokemon.module.scss";

function Pokemon() {
	const [pokemon, setPokemon] = useState([]);
	const { id } = useParams();

	// const slicedDate = pokemon.date_added && pokemon.date.slice(0, 10);

	console.log(pokemon);

	useEffect(() => {
		pokemonAPI
			.get(`/api/pokemons/${id}`)
			.then((res) => setPokemon(res.data))
			.catch((e) => console.error(e));
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Pokemon</h1>
			<div className={styles.card}>
				<img
					src={`/assets/pokemons/${pokemon.picture}`}
					alt='pokemon illustration'
					className={styles.picture}
				/>
				<table className={styles.table}>
					<tbody>
						<tr>
							<td>Nom</td>
							<td>{pokemon.name}</td>
						</tr>
						<tr>
							<td>Points de vie</td>
							<td colSpan='2'>{pokemon.hp}</td>
						</tr>
						<tr>
							<td>Dégâts</td>
							<td>{pokemon.dmg}</td>
						</tr>
						<tr>
							<td>Types</td>
							<td>Feu</td>
							<td>Feu</td>
						</tr>
						<tr>
							<td>Date d'ajout</td>
							<td>2023/04/04</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Pokemon;
