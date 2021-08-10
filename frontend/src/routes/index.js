import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main, colorTest, LogIn, MyPage, Register, Intro, ChallengeInfoFix, NowChallenge, ChallengeMake, ManageChallenge, PwFind, ResignChallenge } from "../pages";

import '../css/main.scss';
import { Layout } from '../components';
import { ChallengeProvider, MultiProvider } from '../MVVM/Provider';
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
					<ContextRoute exact path="/challenge/info/:challengeId/fix" Component={ChallengeInfoFix} Provider={MultiProvider} />
					<ContextRoute exact path="/challenge/manage/:challengeId" Component={ManageChallenge} Provider={ChallengeProvider} />
					<ContextRoute exact path="/challenge/make" Component={ChallengeMake} Provider={ChallengeProvider} />
					<ContextRoute exact path="/challenge/member/:challengeId" Component={ResignChallenge} Provider={ChallengeProvider} />
					<Route exact path="/color" component={colorTest} />
					<ContextRoute exact path="/mypage" Component={MyPage} Provider={MultiProvider} />
					<Route exact path="/findpw" component={PwFind} />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}

export default Router;
