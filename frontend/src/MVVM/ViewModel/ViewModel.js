import React from 'react';
import { UserLogicProvider, ChallengeLogicProvider } from '.';

const ViewModel = ({ children }) => (
	<UserLogicProvider>
		<ChallengeLogicProvider>
			{children}
		</ChallengeLogicProvider>
	</UserLogicProvider>
);

export default ViewModel;
