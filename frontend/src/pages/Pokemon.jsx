import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import pokemonAPI from "../services/pokemonAPI.js";

import styles from "../styles/pages/Pokemon.module.scss";

import trashbin from "../assets/images/delete.png";
import pen from "../assets/images/pen.png";
import save from "../assets/images/save.png";

function Pokemon() {
	const [pokemon, setPokemon] = useState([]);
	const [editable, setEditable] = useState(false);
	const [name, setName] = useState("");
	const [hp, setHp] = useState("");
	const [dmg, setDmg] = useState("");
	const { id } = useParams();

	const formatedDate = pokemon.date_added && pokemon.date_added.slice(0, 10);

	console.log(pokemon);

	useEffect(() => {
		pokemonAPI
			.get(`/api/pokemons/user/${id}`)
			.then((res) => setPokemon(res.data))
			.catch((e) => console.error(e));
	}, []);

	useEffect(() => {
		setName(pokemon.name);
		setHp(pokemon.hp);
		setDmg(pokemon.dmg);
	}, [pokemon]);

	const handleEditClick = () => {
		setEditable(!editable);
	};

	const handleSubmit = () => {
		pokemonAPI
			.patch(`/api/pokemons/${id}`, { name, hp, dmg, types: pokemon.types })
			.catch((e) => console.error(e));
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleHpChange = (event) => {
		setHp(event.target.value);
	};

	const handleDmgChange = (event) => {
		setDmg(event.target.value);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Pokemon</h1>
			<div className={styles.card}>
				<img
					src={`/assets/pokemons/${pokemon.picture}`}
					alt='pokemon illustration'
					className={styles.picture}
				/>
				<img
					src={trashbin}
					alt='trashbin icon'
					className={styles["icon-delete"]}
				/>
				{editable ? (
					<img
						src={save}
						alt='save icon'
						className={styles.icon}
						onClick={handleEditClick && handleSubmit}
					/>
				) : (
					<img
						src={pen}
						alt='pen icon'
						className={styles.icon}
						onClick={handleEditClick}
					/>
				)}
				<table className={styles.table}>
					<tbody>
						<tr>
							<td>Nom</td>
							{editable ? (
								<td>
									<input
										type='text'
										value={name}
										onChange={handleNameChange}
										className={styles.input}
									/>
								</td>
							) : (
								<td>{pokemon.name}</td>
							)}
						</tr>
						<tr>
							<td>Points de vie</td>
							{editable ? (
								<td>
									<input
										type='text'
										value={hp}
										onChange={handleHpChange}
										className={styles.input}
									/>
								</td>
							) : (
								<td>{pokemon.hp}</td>
							)}
						</tr>
						<tr>
							<td>Dégâts</td>
							{editable ? (
								<td>
									<input
										type='text'
										value={dmg}
										onChange={handleDmgChange}
										className={styles.input}
									/>
								</td>
							) : (
								<td>{pokemon.dmg}</td>
							)}
						</tr>
						<tr>
							<td>Types</td>
							<td>{pokemon.type_name}</td>
						</tr>
						<tr>
							<td>Date d'ajout</td>
							<td>{formatedDate}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Pokemon;
