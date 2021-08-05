import React, { useState, useContext, createContext } from 'react';

const ChallengeState = createContext([]);
const ChallengeDispatch = createContext(() => {});

export const ChallengeContextProvider = ({ children }) => {
	const [challengeData, setChallengeData] = useState([{
		id: 1,
		name: "밥 한끼 먹기",
		sDate: new Date("2021-04-08"),
		eDate: new Date("2021-06-20"),
		user: [1, 2, 3],
		lead: 1,
		isEnd: 0
	}, {
		id: 2,
		name: "이름이 엄청나게 긴 챌린지래",
		sDate: new Date("2021-04-08"),
		eDate: new Date("2021-06-20"),
		user: [2, 3],
		lead: 2,
		isEnd: 0
	}, {
		id: 3,
		name: "임시챌린지",
		sDate: new Date("2021-04-08"),
		eDate: new Date("2021-06-20"),
		user: [4],
		lead: 4,
		isEnd: 0
	}, {
		id: 4,
		name: "임시챌린지 2",
		sDate: new Date("2021-04-08"),
		eDate: new Date("2021-06-20"),
		user: [5],
		lead: 5,
		isEnd: 1
	}, {
		id: 5,
		name: "임시챌린지 3",
		sDate: new Date("2021-04-08"),
		eDate: new Date("2021-06-20"),
		user: [1, 3],
		lead: 3,
		isEnd: 0
	}, {
		id: 6,
		name: "임시챌린지 4",
		sDate: new Date("2021-04-08"),
		eDate: new Date("2021-06-20"),
		user: [1, 2, 3, 4],
		lead: 1,
		isEnd: 1
	}]); // 임시데이터
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
