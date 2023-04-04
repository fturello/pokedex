import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AddPokemon from "./pages/AddPokemon";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { useAuthContext } from "./contexts/authContext";

function App() {
	const { user } = useAuthContext();

	return (
		<>
			<Header />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route element={<ProtectedRoute user={user} />}>
					<Route path='/' element={<Home />} />
					<Route path='/add-pokemon' element={<AddPokemon />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
