import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main, colorTest, LogIn, MyPage, Register, Intro, challengeInfoFix } from "../pages";
import '../css/main.scss';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exate path="/login" component={LogIn} />
				<Route exact path="/color" component={colorTest} />
				<Route exact path="/mypage" component={MyPage} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/intro" component={Intro} />
				<Route exact path="/challenge/info/:challengeId/fix" component={challengeInfoFix} />
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
