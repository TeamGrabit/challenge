import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main, LogIn } from "../pages";
import '../css/main.scss';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exate path="/logIn" component={LogIn} />
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
