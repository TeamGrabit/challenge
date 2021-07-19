import React, { useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { useApproveState, useApproveDispatch } from '../Model/ApproveModel';
import { API_URL } from '../../CommonVariable';

const CreateApproveContext = createContext(() => {});

export const ApproveLogicProvider = ({ children }) => {
	const approve = useApproveState();
	const approveDispatch = useApproveDispatch();

	const createApprove = async (approveInfo) => {
		console.log(approveInfo);
		let flag = false;
		await axios.post(`${API_URL}/approve`, {
			ch_id: approveInfo.ch_id,
			user_id: approveInfo.user_id,
			type: approveInfo.type,
			message: approveInfo.message
		}).then((res) => {
			flag = res.data;
		});
		return flag;
	};
	return (
		<CreateApproveContext.Provider value={createApprove}>
			{children}
		</CreateApproveContext.Provider>
	);
};

export function useCreateApprove() {
	const context = useContext(CreateApproveContext);
	return context;
}
