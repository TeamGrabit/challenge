import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main } from "../pages";
import '../css/main.scss';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Main} />
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
