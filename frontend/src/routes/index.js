import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main, colorTest, LogIn, MyPage, Register, Intro, ChallengeInfoFix, NowChallenge, ChallengeMake, ManageChallenge } from "../pages";

import '../css/main.scss';
import { Layout } from '../components';
import { ChallengeProvider } from '../MVVM/Provider';
import ContextRoute from './ContextRoute';

function Router() {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route exact path="/" component={Intro} />
					<Route exate path="/login" component={LogIn} />
					<Route exact path="/register" component={Register} />
					<ContextRoute path="/challenge" Component={Main} exact Provider={ChallengeProvider} />
					<ContextRoute path="/challenge/info/:challengeId" exact Component={NowChallenge} Provider={ChallengeProvider} />
					<Route exact path="/challenge/info/:challengeId/fix" component={ChallengeInfoFix} />
					<ContextRoute exact path="/challenge/manage/:challengeId" Component={ManageChallenge} Provider={ChallengeProvider} />
					<Route exact path="/challenge/make" component={ChallengeMake} />
					<Route exact path="/color" component={colorTest} />
					<Route exact path="/mypage" component={MyPage} />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}

export default Router;
