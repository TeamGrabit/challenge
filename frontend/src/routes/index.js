import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main, logIn } from "../pages";
import '../css/main.scss';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exate path="/logIn" component={logIn} />
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
