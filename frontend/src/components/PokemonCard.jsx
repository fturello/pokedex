import styles from "../styles/components/PokemonCard.module.scss";

function PokemonCard({ name, picture, hp, dmg, dateAdded }) {
	const slicedDate = dateAdded.slice(0, 10);
	const slicedHours = dateAdded.slice(11, 16);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<img
					src={`/assets/pokemons/${picture}`}
					alt='pokemon illustration'
					className={styles["pokemon-picture"]}
				/>
				<div className={styles.details}>
					<h3 className={styles["pokemon-name"]}>{name}</h3>
					<div className={styles.stats}>
						<p>{hp} pv</p>
						<p>{dmg} dégats</p>
						<p>{slicedDate}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PokemonCard;
