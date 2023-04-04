import { useState, useEffect } from "react";

import pokemonAPI from "../services/pokemonAPI";

import styles from "../styles/pages/AddPokemon.module.scss";

function AddPokemon() {
	const [typesData, setTypesData] = useState([]);
	const [name, setName] = useState("");
	const [hp, setHp] = useState("");
	const [dmg, setDmg] = useState("");
	const [typesValues, setTypesValues] = useState([
		{ name: "Plante", isChecked: false },
		{ name: "Eau", isChecked: false },
		{ name: "Feu", isChecked: false },
		{ name: "Poison", isChecked: false },
		{ name: "Insecte", isChecked: false },
		{ name: "Normal", isChecked: false },
		{ name: "Vol", isChecked: false },
		{ name: "Electrik", isChecked: false },
		{ name: "Fée", isChecked: false },
		{ name: "Psy", isChecked: false },
		{ name: "Sol", isChecked: false },
		{ name: "Glace", isChecked: false },
		{ name: "Combat", isChecked: false },
		{ name: "Roche", isChecked: false },
		{ name: "Acier", isChecked: false },
		{ name: "Spectre", isChecked: false },
		{ name: "Ténèbres", isChecked: false },
		{ name: "Dragon", isChecked: false },
	]);
	const [types, setTypes] = useState([]);

	console.log(types);

	useEffect(() => {
		pokemonAPI
			.get("/api/pokemons/types")
			.then((res) => {
				setTypesData(res.data);
			})
			.catch((err) => console.error(err));
	}, []);

	function handleCheckboxChange(event, typeName) {
		const index = typesValues.findIndex((type) => type.name === typeName);
		const newTypesValues = [...typesValues];
		newTypesValues[index] = {
			...newTypesValues[index],
			isChecked: event.target.checked,
		};
		setTypesValues(newTypesValues);

		const selectedTypes = newTypesValues
			.filter((obj) => obj.isChecked === true)
			.map((obj) => obj.name);

		setTypes(selectedTypes);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		pokemonAPI
			.post("/api/pokemons", { name, hp, dmg, types })
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Nouveau pokemon</h1>
			<div className={styles.card}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.field}>
						<label htmlFor='name_field' className={styles.label}>
							Nom
						</label>
						<input
							onChange={(e) => setName(e.target.value)}
							type='text'
							name='pokemonName'
							id='pokemonName'
							className={styles.input}
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor='name_field' className={styles.label}>
							Points de vie
						</label>
						<input
							onChange={(e) => setHp(e.target.value)}
							type='number'
							name='hp'
							id='hp'
							className={styles.input}
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor='name_field' className={styles.label}>
							Dégâts
						</label>
						<input
							onChange={(e) => setDmg(e.target.value)}
							type='number'
							name='damage'
							id='damage'
							className={styles.input}
						/>
					</div>
					<div className={styles["checkbox-group"]}>
						{typesData.map((type) => (
							<div key={type.id} className={styles["checkbox-container"]}>
								<label className={styles["label-container"]}>
									<input
										type='checkbox'
										checked={type.isChecked}
										onChange={(event) => handleCheckboxChange(event, type.name)}
									/>
									<span className={styles.checkmark}></span>
								</label>
								<p className={styles["type-name"]}>{type.name}</p>
							</div>
						))}
					</div>
					<button type='submit' className={styles["btn-submit"]}>
						Valider
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddPokemon;
