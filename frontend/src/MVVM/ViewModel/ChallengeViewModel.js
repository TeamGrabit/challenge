import React, { useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { useChallengeState, useChallengeDispatch } from '../Model/ChallengeModel';
import { useUserState } from '../Model/UserModel';
import { API_URL } from '../../CommonVariable';

const GetChallengeContext = createContext(() => {});
const GetChallengeDetailContext = createContext(() => {});
const SaveChallengeContext = createContext(() => {});
const DeleteChallengeContext = createContext(() => {});

export const ChallengeLogicProvider = ({ children }) => {
	const challenge = useChallengeState();
	const challengeDispatch = useChallengeDispatch();
	const user = useUserState();
	console.log(user);

	useEffect(() => {
		if (user.userId !== undefined) getChallengeList();
	}, [user]);
	const getChallengeList = async () => {
		axios.get(`${API_URL}/challenge/list/${user.userId}`).then((res) => {
			challengeDispatch(res.data);
			console.log(res.data);
		})
			.catch((error) => { console.log(error); });
	};
	const getChallengeDetail = (CId) => {
		axios.get(`${API_URL}/challenge/${CId}`).then((res) => {
			console.log(res);
			return res.data;
		});
	};
	const saveChallenge = () => {

	};
	const deleteChallenge = () => {

	};
	return (
		<GetChallengeContext.Provider value={getChallengeList}>
			<GetChallengeDetailContext.Provider value={getChallengeDetail}>
				<SaveChallengeContext.Provider value={saveChallenge}>
					<DeleteChallengeContext.Provider value={deleteChallenge}>
						{children}
					</DeleteChallengeContext.Provider>
				</SaveChallengeContext.Provider>
			</GetChallengeDetailContext.Provider>
		</GetChallengeContext.Provider>
	);
};

export function useGetChallenge() {
	const context = useContext(GetChallengeContext);
	return context;
}

export function useGetChallengeDetail() {
	const context = useContext(GetChallengeDetailContext);
	return context;
}
