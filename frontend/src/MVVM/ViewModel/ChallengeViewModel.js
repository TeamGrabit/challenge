import React, { useContext, createContext, useEffect } from 'react';
import { useChallengeState, useChallengeDispatch } from '../Model/ChallengeModel';

const SaveChallengeContext = createContext(() => {});
const DeleteChallengeContext = createContext(() => {});

export const ChallengeLogicProvider = ({ children }) => {
	const challenge = useChallengeState();
	const ChallengeDispatch = useChallengeDispatch();

	const saveChallenge = () => {

	};
	const deleteChallenge = () => {

	};
	return (
		<SaveChallengeContext.Provider value={saveChallenge}>
			<DeleteChallengeContext.Provider value={deleteChallenge}>
				{children}
			</DeleteChallengeContext.Provider>
		</SaveChallengeContext.Provider>
	);
};
