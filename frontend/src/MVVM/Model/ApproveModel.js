import React, { useState, useContext, createContext } from 'react';

const ApproveState = createContext([]);
const ApproveDispatch = createContext(() => {});

export const ApproveContextProvider = ({ children }) => {
	const [approveData, setApproveData] = useState([]);
	return (
		<ApproveState.Provider value={approveData}>
			<ApproveDispatch.Provider value={setApproveData}>
				{children}
			</ApproveDispatch.Provider>
		</ApproveState.Provider>
	);
};

export function useApproveState() {
	const context = useContext(ApproveState);
	return context;
}

export function useApproveDispatch() {
	const context = useContext(ApproveDispatch);
	return context;
}
