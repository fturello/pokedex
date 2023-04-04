import React from "react";
import ReactDOM from "react-dom/client";
import { CurrentUserContextProvider } from "./contexts/authContext.jsx";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CurrentUserContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</CurrentUserContextProvider>
	</React.StrictMode>
);
