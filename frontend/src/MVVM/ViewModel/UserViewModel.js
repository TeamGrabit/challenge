import React, { useState, useContext, createContext } from 'react';
import { useUserState, useUserDispatch } from '../Model/UserModel';

const LoginUserContext = createContext((id, pw) => {});
const LogoutUserContext = createContext(() => {});

export const UserLogicProvider = ({ children }) => {
	const user = useUserState();
	const userDispatch = useUserDispatch();

	const LoginUser = (id, pw) => {
		if (id === "123" && pw === "123") {
			// 임시 유저 id=123, pw=123
			userDispatch({
				...user, // user에 다른 속성이 있을 경우 가져오려고
				auth: "user"
			});
			console.log("로그인성공");
			return true;
		}
		return false;
	};

	const LogoutUser = () => {
		if (user.auth === "user") {
			userDispatch({
				...user,
				auth: "no"
			});
		}
	};

	return (
		<LoginUserContext.Provider value={LoginUser}>
			<LogoutUserContext.Provider value={LogoutUser}>
				{children}
			</LogoutUserContext.Provider>
		</LoginUserContext.Provider>
	);
};

export function useLoginUser() {
	const context = useContext(LoginUserContext);
	return context;
}

export function useLogoutUser() {
	const context = useContext(LogoutUserContext);
	return context;
}
