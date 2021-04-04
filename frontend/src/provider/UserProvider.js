import React, { createContext, useState } from 'react';

const LoginContext = createContext({
	state: {
		isLogined: {},
	},
	actions: {
		setIsLogined: () => {},
	}
});

const UserProvider = ({children}) => {
	const [loginInfo, setLoginInfo] = useState({});

	const value = {
		state: { loginInfo },
		actions: { setLoginInfo }
	};

	return (
		<LoginContext.Provider value={[value.state, value.actions]}>
			{children}
		</LoginContext.Provider>
	)
}

const LoginConsumer = LoginContext.Consumer;

export { UserProvider, LoginConsumer };

export default LoginContext;
