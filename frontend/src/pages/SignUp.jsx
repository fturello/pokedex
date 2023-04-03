import { useState } from "react";

import styles from "../styles/pages/Login.module.scss";
function Login() {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className={styles.container}>
			<form className={styles.form}>
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
						type='text'
						name='password'
						id='password'
						placeholder='Password'
						className={styles.input}
					/>
				</div>
				<button type='submit'></button>
			</form>
		</div>
	);
}

export default Login;
