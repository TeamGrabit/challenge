import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main, colorTest, challengeStatusModify } from "../pages";
import '../css/main.scss';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/color" component={colorTest} />
				<Route exact path="/challengeStatusModify" component={challengeStatusModify} />
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
