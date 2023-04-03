import { useState } from "react";
import { useNavigate } from "react-router-dom";

import pokemonAPI from "../services/pokemonAPI";

import styles from "../styles/pages/Login.module.scss";
function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (username && password) {
			pokemonAPI
				.post("/api/login", { username, password })
				.then((res) => {
					console.log(res);
					navigate("/home");
				})
				.catch((err) => console.error(err));
		} else {
			alert("Please fill in all fields");
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div>
					<input
						onChange={(e) => setUsername(e.target.value)}
						type='text'
						name='username'
						id='username'
						placeholder='Username'
						className={styles.input}
					/>
				</div>
				<div>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type='text'
						name='password'
						id='password'
						placeholder='Password'
						className={styles.input}
					/>
				</div>
				<button type='submit' className={styles["btn-submit"]}></button>
			</form>
		</div>
	);
}

export default Login;
