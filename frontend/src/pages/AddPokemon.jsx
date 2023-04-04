import { useState } from "react";

import styles from "../styles/pages/AddPokemon.module.scss";

function AddPokemon() {
	const [pokemonName, setPokemonName] = useState("");
	const [hp, setHp] = useState("");
	const [damage, setDamage] = useState("");
	const [isChecked, setIsChecked] = useState(false);

	function handleCheckboxChange(event) {
		setIsChecked(event.target.checked);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
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
							onChange={(e) => setPokemonName(e.target.value)}
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
							onChange={(e) => setDamage(e.target.value)}
							type='number'
							name='damage'
							id='damage'
							className={styles.input}
						/>
					</div>
					<label className={styles["checkbox-container"]}>
						<input
							type='checkbox'
							checked={isChecked}
							onChange={handleCheckboxChange}
						/>
						<span className={styles.checkmark}></span>
					</label>
					<button type='submit' className={styles["btn-login"]}>
						Valider
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddPokemon;
