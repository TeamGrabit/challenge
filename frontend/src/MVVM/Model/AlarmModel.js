import React, { useState, useContext, createContext } from 'react';

const AlarmState = createContext([]);
const AlarmDispatch = createContext(() => {});

export const AlarmContextProvider = ({ children }) => {
	const [alarm, setAlarmData] = useState([]);
	return (
		<AlarmState.Provider value={alarm}>
			<AlarmDispatch.Provider value={setAlarmData}>
				{children}
			</AlarmDispatch.Provider>
		</AlarmState.Provider>
	);
};

export function useAlarmState() {
	const context = useContext(AlarmState);
	return context;
}

export function useAlarmDispatch() {
	const context = useContext(AlarmDispatch);
	return context;
}
