import React from 'react';
import ChallengeProvider from './ChallengeProvider';
import ApproveProvider from './ApproveProvider';
import UserProvider from './UserProvider';

function MultiProvider({ children }) {
	return (
		<ChallengeProvider>
			<ApproveProvider>
				{children}
			</ApproveProvider>
		</ChallengeProvider>
	);
}

export default MultiProvider;
