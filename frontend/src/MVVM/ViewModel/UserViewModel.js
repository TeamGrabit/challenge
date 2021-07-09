import React, { useContext, createContext } from 'react';
import axios from 'axios';
import { useUserState, useUserDispatch, UserContextProvider } from '../Model/UserModel';
import { API_URL } from '../../CommonVariable';

const LoginUserContext = createContext((id, pw) => {});
const LogoutUserContext = createContext(() => {});
const VerifyUserContext = createContext(() => {});
const SendAuthMailContext = createContext((email) => {});
const CheckAuthMailContext = createContext((email, authNum) => {});
const CheckUniqueIdContext = createContext((id) => {});
const SignUpUserContext = createContext((userInfo) => {});

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
			if (res.data.result) flag = true;
		});
		await VerifyUser();
		return flag;
	};

	const LogoutUser = async () => {
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

	const CheckAuthMail = async (email, authNum) => {
		let flag = false;
		await axios.post(`${API_URL}/authmail/check`, { email, authNum })
			.then((res) => { flag = res.data.result; });
		return flag;
	};

	const CheckUniqueId = async (id) => {
		let flag = false;
		await axios.get(`${API_URL}/user/uniqueid/${id}`)
			.then((res) => { flag = !res.data.duplicate; console.log(res.data.duplicate); });
		return flag;
	};
	const SignUp = async (userInfo) => {
		console.log(userInfo);
		let flag = false;
		await axios.post(`${API_URL}/signup`, {
			userId: userInfo.id,
			userPw: userInfo.pw,
			userName: userInfo.name,
			userEmail: userInfo.email,
			gitId: userInfo.githubId
		}).then((res) => {
			flag = res.data.result;
		});
		return flag;
	};
	return (
		<LoginUserContext.Provider value={LoginUser}>
			<LogoutUserContext.Provider value={LogoutUser}>
				<VerifyUserContext.Provider value={VerifyUser}>
					<SendAuthMailContext.Provider value={SendAuthMail}>
						<CheckAuthMailContext.Provider value={CheckAuthMail}>
							<CheckUniqueIdContext.Provider value={CheckUniqueId}>
								<SignUpUserContext.Provider value={SignUp}>
									{children}
								</SignUpUserContext.Provider>
							</CheckUniqueIdContext.Provider>
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

export function useCheckUniqueId() {
	const context = useContext(CheckUniqueIdContext);
	return context;
}
export function useSignUpUser() {
	const context = useContext(SignUpUserContext);
	return context;
}
