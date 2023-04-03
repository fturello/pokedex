import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/sign-up' element={<SignUp />} />\
				<Route path='/home' element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
