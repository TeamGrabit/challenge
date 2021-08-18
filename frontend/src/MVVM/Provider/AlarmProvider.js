import React from 'react';
import { AlarmContextProvider } from '../Model/AlarmModel';
import { AlarmLogicProvider } from '../ViewModel/AlarmViewModel';

function AlarmProvider({ children }) {
	return (
		<AlarmContextProvider>
			<AlarmLogicProvider>
				{children}
			</AlarmLogicProvider>
		</AlarmContextProvider>
	);
}

export default AlarmProvider;
