import React from 'react';
import { ChallengeContextProvider, UserContextProvider } from '.';

function Model({ children }) {
	return (
		<UserContextProvider>
			<ChallengeContextProvider>
				{children}
			</ChallengeContextProvider>
		</UserContextProvider>
	);
}

export default Model;
