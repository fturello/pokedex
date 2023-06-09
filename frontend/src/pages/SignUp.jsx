import { useState } from "react";
import { useNavigate } from "react-router-dom";

import pokemonAPI from "../services/pokemonAPI";

import styles from "../styles/pages/SignUp.module.scss";
function Login() {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (email && username && password && confirmPassword) {
			if (password === confirmPassword) {
				pokemonAPI
					.post("/api/users", { email, username, password })
					.then((res) => {
						navigate("/");
					})
					.catch((err) => {
						console.error(err);
					});
			} else {
				setError("Passwords do not match");
			}
		} else {
			setError("Please fill in all fields");
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				<div>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type='text'
						name='email'
						id='email'
						placeholder='Email'
						className={styles.input}
					/>
				</div>
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
				<div>
					<input
						onChange={(e) => setConfirmPassword(e.target.value)}
						type='password'
						name='confirmPassword'
						id='confirmPassword'
						placeholder='Confirm password'
						className={styles.input}
					/>
				</div>
				<button type='submit' className={styles["btn-signup"]}>
					Signup
				</button>
			</form>
		</div>
	);
}

export default Login;
