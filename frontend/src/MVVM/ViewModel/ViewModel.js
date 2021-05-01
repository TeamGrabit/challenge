import React from 'react';
import { UserLogicProvider } from '.';

export const ViewModel = ({ children }) => (
	<UserLogicProvider>
		{children}
	</UserLogicProvider>
);
