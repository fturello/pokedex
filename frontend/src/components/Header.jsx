import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { useAuthContext } from "../contexts/authContext";
import pokemonAPI from "../services/pokemonAPI";

import styles from "../styles/components/Header.module.scss";

import logo from "../assets/images/logo.png";
import downArrow from "../assets/images/down-arrow.png";
import menuBtn from "../assets/images/menu-btn.png";

function Header() {
	const { user, setUser } = useAuthContext();
	const [menuOpen, setMenuOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const navigate = useNavigate();

	const activeStyle = ({ isActive }) => {
		if (isActive)
			return {
				color: "#ffffff",
				borderBottom: "solid 3px #f00000",
				padding: "6px 0px",
			};
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleDropdownOpen = () => {
		setDropdownOpen(true);
	};

	const handleDropdownClose = () => {
		setDropdownOpen(false);
	};

	const handleDisconnect = () => {
		pokemonAPI
			.get("/api/logout")
			.then(() => {
				localStorage.clear();
				setUser(null);
				navigate("/login");
			})
			.catch((err) => console.error(err));
	};

	return (
		<nav className={styles.navbar}>
			<NavLink to='/'>
				<img src={logo} className={styles.logo} />
			</NavLink>
			<ul className={styles.menu}>
				{user ? (
					<>
						<li>
							<NavLink
								to='/add-pokemon'
								style={activeStyle}
								className={styles.tab}
							>
								Ajouter un Pokemon
							</NavLink>
						</li>
						<li>
							<NavLink to='/' style={activeStyle} className={styles.tab}>
								Mon Pokedex
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/account'
								style={activeStyle}
								className={styles.profile}
							>
								Mon profil
							</NavLink>
						</li>
						<div className={styles["account-container"]}>
							<li className={styles["dropdown-menu"]}>
								<NavLink
									to='/account'
									style={activeStyle}
									className={styles.menu}
								>
									<img
										src={downArrow}
										alt='down arrow'
										onMouseEnter={handleDropdownOpen}
										onMouseLeave={handleDropdownClose}
										className={styles["down-arrow"]}
									/>
									Mon compte
									{dropdownOpen && (
										<div
											className={styles["dropdown-container"]}
											onMouseEnter={handleDropdownOpen}
											onMouseLeave={handleDropdownClose}
										>
											<div className={styles["dropdown-content"]}>
												<button type='button' onClick={handleDisconnect}>
													Se deconnecter
												</button>
											</div>
										</div>
									)}
								</NavLink>
							</li>
						</div>
					</>
				) : (
					<>
						<li>
							<NavLink to='/login' style={activeStyle} className={styles.tab}>
								Connexion
							</NavLink>
						</li>
						<li>
							<NavLink to='/sign-up' style={activeStyle} className={styles.tab}>
								Inscription
							</NavLink>
						</li>
					</>
				)}
			</ul>
			<button className={styles["menu-burger"]} onClick={toggleMenu}>
				<img src={menuBtn} alt='menu burger' className={styles.burger} />
			</button>
		</nav>
	);
}
export default Header;
