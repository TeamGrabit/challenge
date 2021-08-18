import React, { useContext, createContext } from 'react';
import axios from 'axios';
import { useAlarmState, useAlarmDispatch } from '../Model/AlarmModel';
import { API_URL } from '../../CommonVariable';

const getAlarmsContext = createContext(() => {});

export const AlarmLogicProvider = ({ children }) => {
	const alarm = useAlarmState();
	const alarmDispatch = useAlarmDispatch();

	const getAlarms = async (user_id) => {
		var alarms = []
		await axios.get(`${API_URL}/alarm`, {
			params:{
				user_id: user_id
			}
		}).then((res) => {
			alarms = res.data.result;
		});
		return alarms;
	};
	return (
		<getAlarmsContext.Provider value={getAlarms}>
			{children}
		</getAlarmsContext.Provider>
	);
};

export function useGetAlarms() {
	const context = useContext(getAlarmsContext);
	return context;
}
