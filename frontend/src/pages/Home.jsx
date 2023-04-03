import { useState, useEffect } from "react";
import pokemonAPI from "../services/pokemonAPI.js";

import PokemonCard from "../components/PokemonCard.jsx";

import styles from "../styles/pages/Home.module.scss";
function Home() {
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		pokemonAPI
			.get("/api/pokemons/user-pokemons")
			.then((res) => setPokemons(res.data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Mes Pokemons</h1>
			<div className={styles["cards-container"]}>
				{pokemons.map((pokemon) => (
					<PokemonCard
						key={pokemon.id}
						name={pokemon.name}
						picture={pokemon.picture}
						hp={pokemon.hp}
						dmg={pokemon.dmg}
						dateAdded={pokemon.date_added}
					/>
				))}
			</div>
		</div>
	);
}

export default Home;
