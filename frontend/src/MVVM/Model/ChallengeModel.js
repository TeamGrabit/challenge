import React, { useState, useContext, createContext } from 'react';

const ChallengeState = createContext([]);
const ChallengeDispatch = createContext(() => {});

export const ChallengeContextProvider = ({ children }) => {
	const [challengeData, setChallengeData] = useState([]);
	return (
		<ChallengeState.Provider value={challengeData}>
			<ChallengeDispatch.Provider value={setChallengeData}>
				{children}
			</ChallengeDispatch.Provider>
		</ChallengeState.Provider>
	);
};

export function useChallengeState() {
	const context = useContext(ChallengeState);
	return context;
}

export function useChallengeDispatch() {
	const context = useContext(ChallengeDispatch);
	return context;
}
