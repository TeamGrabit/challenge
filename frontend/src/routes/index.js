import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main, colorTest, LogIn, MyPage, Register, Intro, ChallengeInfoFix, NowChallenge, ChallengeMake, ManageChallenge } from "../pages";

import '../css/main.scss';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exate path="/login" component={LogIn} />
				<Route exact path="/challenge" component={Main} />
				<Route exact path="/challenge/make" component={ChallengeMake} />
				<Route exact path="/color" component={colorTest} />
				<Route exact path="/mypage" component={MyPage} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/" component={Intro} />
				<Route exact path="/challenge/info/:challengeId/fix" component={ChallengeInfoFix} />
				<Route exact path="/challenge/info/:challengeId" component={NowChallenge} />
				<Route exact path="/challenge/manage/:challengeId" component={ManageChallenge} />
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
