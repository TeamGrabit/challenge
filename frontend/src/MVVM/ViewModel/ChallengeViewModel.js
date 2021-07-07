import React, { useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { useChallengeState, useChallengeDispatch } from '../Model/ChallengeModel';
import { useUserState } from '../Model/UserModel';
import { API_URL } from '../../CommonVariable';

const GetChallengeContext = createContext(() => {});
const SaveChallengeContext = createContext(() => {});
const DeleteChallengeContext = createContext(() => {});

export const ChallengeLogicProvider = ({ children }) => {
	const challenge = useChallengeState();
	const challengeDispatch = useChallengeDispatch();
	const user = useUserState();
	console.log(user);

	useEffect(() => {
		if (user.userId !== undefined) getChallenge();
	}, [user]);
	const getChallenge = async () => {
		axios.get(`${API_URL}/challenge/list/${user.userId}`).then((res) => {
			challengeDispatch(res.data);
			console.log(res.data);
		})
			.catch((error) => { console.log(error); });
	};
	const saveChallenge = () => {

	};
	const deleteChallenge = () => {

	};
	return (
		<GetChallengeContext.Provider value={getChallenge}>
			<SaveChallengeContext.Provider value={saveChallenge}>
				<DeleteChallengeContext.Provider value={deleteChallenge}>
					{children}
				</DeleteChallengeContext.Provider>
			</SaveChallengeContext.Provider>
		</GetChallengeContext.Provider>
	);
};

export function useGetChallenge() {
	const context = useContext(GetChallengeContext);
	return context;
}
