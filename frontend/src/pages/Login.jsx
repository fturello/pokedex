import { useState } from "react";
import { useNavigate } from "react-router-dom";

import pokemonAPI from "../services/pokemonAPI";

import styles from "../styles/pages/Login.module.scss";
function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (username && password) {
			pokemonAPI
				.post("/api/login", { username, password })
				.then((res) => {
					navigate("/home");
				})
				.catch((err) => setError(err.response.data.message));
		} else {
			alert("Please fill in all fields");
		}
	};

	const onPressSignup = () => {
		navigate("/sign-up");
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
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
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						className={styles.input}
					/>
				</div>
				<button type='submit' className={styles["btn-login"]}>
					Login
				</button>
				<button onClick={onPressSignup} className={styles["btn-signup"]}>
					Signup
				</button>
			</form>
		</div>
	);
}

export default Login;
