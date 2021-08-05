import React, { useState, useContext, createContext } from 'react';

const userContext = createContext({
	auth: "no"
	// room: 1 이런식으로 몇 번 방의 방장 나타내는 것도 좋을듯
});
const userDispatch = createContext(() => {});

export const UserContextProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		auth: "no"
	});
	return (
		<userContext.Provider value={userData}>
			<userDispatch.Provider value={setUserData}>
				{children}
			</userDispatch.Provider>
		</userContext.Provider>
	);
};

export function useUserState() {
	const context = useContext(userContext);
	return context;
}

export function useUserDispatch() {
	const context = useContext(userDispatch);
	return context;
}
