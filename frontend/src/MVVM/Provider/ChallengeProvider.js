import React from 'react';
import { ChallengeContextProvider } from '../Model/ChallengeModel';
import { ChallengeLogicProvider } from '../ViewModel/ChallengeViewModel';

function ChallengeProvider({ children }) {
	return (
		<ChallengeContextProvider>
			<ChallengeLogicProvider>
				{children}
			</ChallengeLogicProvider>
		</ChallengeContextProvider>
	);
}

export default ChallengeProvider;
