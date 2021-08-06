import React, { useContext, createContext } from 'react';
import axios from 'axios';
import { useApproveState, useApproveDispatch } from '../Model/ApproveModel';
import { API_URL } from '../../CommonVariable';

const CreateApproveContext = createContext(() => {});
const DDContext = createContext(() => {});

export const ApproveLogicProvider = ({ children }) => {
	const approve = useApproveState();
	const approveDispatch = useApproveDispatch();

	const createApprove = async (approveInfo, onClose) => {
		onClose();
		console.log(approveInfo);
		let flag = false;
		await axios.post(`${API_URL}/approve`, {
			ch_id: approveInfo.ch_id,
			user_id: approveInfo.user_id,
			type: approveInfo.type,
			message: approveInfo.message,
			request_date: approveInfo.request_date
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
