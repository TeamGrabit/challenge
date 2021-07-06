import React, { useContext, createContext } from 'react';
import axios from 'axios';
import { useUserState, useUserDispatch } from '../Model/UserModel';
import { API_URL } from '../../CommonVariable';

const LoginUserContext = createContext((id, pw) => {});
const LogoutUserContext = createContext(() => {});
const VerifyUserContext = createContext(() => {});
const SendAuthMailContext = createContext((email) => {});
const CheckAuthMailContext = createContext((email, authNum) => {});

export const UserLogicProvider = ({ children }) => {
	const user = useUserState();
	const userDispatch = useUserDispatch();

	const VerifyUser = async () => {
		await axios.post(`${API_URL}/auth/jwtvalidcheck`, {}, {
			withCredentials: true,
		}).then((res) => {
			console.log(res.data);
			userDispatch({
				...res.data,
				auth: "user"
			});
		});
		console.log(user);
	};
	const LoginUser = async (id, pw) => {
		let flag = false;
		console.log("Dddddddddddd");
		await axios.post(`${API_URL}/login`, { userId: id, userPw: pw }, {
			withCredentials: true,
		}).then((res) => {
			console.log(res.data.result);
			if (res.data.result === "ok") flag = true;
		});
		await VerifyUser();
		return flag;
	};

	const LogoutUser = async () => {
		// if (user.auth === "user") {
		// 	userDispatch({
		// 		...user,
		// 		auth: "no"
		// 	});
		// 	console.log("로그아웃 성공");
		// }
		let flag = false;
		await axios.post(`${API_URL}/logout`, {}, {
			withCredentials: true,
		}).then((res) => {
			console.log(res.data.logoutSuccess);
			if (res.data.logoutSuccess === true) flag = true;
		});
		return flag;
	};

	const SendAuthMail = async (eMail) => {
		let flag = false;
		await axios.post(`${API_URL}/authmail/send`, { email: eMail })
			.then((res) => {
				console.log(res);
				if (res.data.result === "success") flag = true;
			});
		return flag;
	};

	const CheckAuthMail = async (Email, AuthNum) => {
		try {
			await axios.get(`${API_URL}/authmail/check`, { email: Email, authNum: AuthNum })
				.then((res) => { console.log(res.error); });
			return false;
		} catch (e) {
			console.log(e);
		}
		return false;
	};
	const SignUp = async () => {

	};
	return (
		<LoginUserContext.Provider value={LoginUser}>
			<LogoutUserContext.Provider value={LogoutUser}>
				<VerifyUserContext.Provider value={VerifyUser}>
					<SendAuthMailContext.Provider value={SendAuthMail}>
						<CheckAuthMailContext.Provider value={CheckAuthMail}>
							{children}
						</CheckAuthMailContext.Provider>
					</SendAuthMailContext.Provider>
				</VerifyUserContext.Provider>
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

export function useVerifyUser() {
	const context = useContext(VerifyUserContext);
	return context;
}

export function useSendAuthMail() {
	const context = useContext(SendAuthMailContext);
	return context;
}

export function useCheckAuthMail() {
	const context = useContext(CheckAuthMailContext);
	return context;
}
