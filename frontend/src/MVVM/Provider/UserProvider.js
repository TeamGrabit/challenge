import React from 'react';
import { UserContextProvider } from '../Model/UserModel';
import { UserLogicProvider } from '../ViewModel/UserViewModel';

function UserProvider({ children }) {
	return (
		<UserContextProvider>
			<UserLogicProvider>
				{children}
			</UserLogicProvider>
		</UserContextProvider>
	);
}

export default UserProvider;
