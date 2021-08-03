import React, { useContext, createContext } from 'react';
import axios from 'axios';
import { useUserState, useUserDispatch, UserContextProvider } from '../Model/UserModel';
import { API_URL } from '../../CommonVariable';

const LoginUserContext = createContext((id, pw) => { });
const LogoutUserContext = createContext(() => { });
const VerifyUserContext = createContext(() => { });
const SendAuthMailContext = createContext((email) => { });
const CheckAuthMailContext = createContext((email, authNum) => { });
const CheckUniqueIdContext = createContext((id) => { });
const SignUpUserContext = createContext((userInfo) => { });
const ChangePwContext = createContext((user_id, new_pw) => { });
const GetUserInfomationContext = createContext((user_id) => { });
const MypageChangePwContext = createContext((user_id, user_pw, new_pw) => { });

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

	const SendAuthMail = async (email, user_id = "", type = 0) => {
		let flag = false;
		await axios.post(`${API_URL}/authmail/send`, { type, user_id, email })
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
	const ChangePw = async (user_id, new_pw) => {
		// let flag = false;

		await axios.patch(`${API_URL}/user/changepw`, {
			type: 0, user_id, new_pw
		}).then((res) => {
			console.log(res.result);
			if (res.result === "success") return true;
			return false;
		});
	};
	const MypageChangePw = async (user_id, user_pw, new_pw, onClose) => {
		onClose();
		let flag = false;
		await axios.patch(`${API_URL}/user/changepw`, {
			type: 1,
			user_id,
			user_pw,
			new_pw
		}).then((res) => {
			if (res.data.result === "success") flag = true;
		}).catch((error) => {
			console.log(error);
		});
		return flag;
	};
	const GetUserInfomation = async (user_id) => {
		await axios.get(`${API_URL}/user/${user_id}`).then((res) => {
			console.log(res);
			return res.data;
		});
	};
	return (
		<LoginUserContext.Provider value={LoginUser}>
			<LogoutUserContext.Provider value={LogoutUser}>
				<VerifyUserContext.Provider value={VerifyUser}>
					<SendAuthMailContext.Provider value={SendAuthMail}>
						<CheckAuthMailContext.Provider value={CheckAuthMail}>
							<CheckUniqueIdContext.Provider value={CheckUniqueId}>
								<SignUpUserContext.Provider value={SignUp}>
									<ChangePwContext.Provider value={ChangePw}>
										<MypageChangePwContext.Provider value={MypageChangePw}>
											<GetUserInfomationContext.Provider value={GetUserInfomation}>
												{children}
											</GetUserInfomationContext.Provider>
										</MypageChangePwContext.Provider>
									</ChangePwContext.Provider>
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
export function useChangePw() {
	const context = useContext(ChangePwContext);
	return context;
}
export function useGetUserInfomation() {
	const context = useContext(GetUserInfomationContext);
	return context;
}
export function useMypageChangePw() {
	const context = useContext(MypageChangePwContext);
	return context;
}
