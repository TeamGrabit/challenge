import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Header from './Header';
import { UserProvider } from '../MVVM/Provider';
import { AlarmProvider } from '../MVVM/Provider';
import AlarmModal from './AlarmModal';

function Layout({ children }) {
	const [alarmOpen, setAlarmOpen] = useState(false);
	const openHandler = (e) => {
		e.preventDefault();
		setAlarmOpen(true);
	}
	return (
		<UserProvider>
			<AlarmProvider>
				<Grid className="layout">
					<Header alarmHandler={openHandler} />
					<Grid id="wrap">
						{children}
					</Grid>
				</Grid>
				<AlarmModal open={alarmOpen} closeHandler={() => setAlarmOpen(false)} />
			</AlarmProvider>
		</UserProvider>
	);
}

export default Layout;
