import React, { useState, useContext, createContext, useEffect } from 'react';
import { checkUser } from '../../functions/Api'
const userContext = createContext({});
const userDispatch = createContext(() => {});

export const UserContextProvider = ({ children }) => {
	const [userData, setUserData] = useState({auth:'loading'});
	useEffect(async ()=> {
		// console.log(userData);
		await checkUser()
			.then((user)=> setUserData(user))
			.catch((err)=> setUserData({auth : "fail"}));
	}, []);
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
