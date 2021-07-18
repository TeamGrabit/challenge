import React, { useState, useContext, createContext } from 'react';

const userContext = createContext({});
const userDispatch = createContext(() => {});

export const UserContextProvider = ({ children }) => {
	const [userData, setUserData] = useState({});
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
