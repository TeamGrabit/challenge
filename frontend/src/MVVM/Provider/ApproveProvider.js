import React from 'react';
import { ApproveContextProvider } from '../Model/ApproveModel';
import { ApproveLogicProvider } from '../ViewModel/ApproveViewModel';

function ApproveProvider({ children }) {
	return (
		<ApproveContextProvider>
			<ApproveLogicProvider>
				{children}
			</ApproveLogicProvider>
		</ApproveContextProvider>
	);
}

export default ApproveProvider;
