import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Header from './Header';
import { UserProvider } from '../MVVM/Provider';
import AlarmModal from './AlarmModal';

function Layout({ children }) {
	const [alarmOpen, setAlarmOpen] = useState(false);
	const openHandler = (e) => {
		e.preventDefault();
		setAlarmOpen(true);
	}
	return (
		<UserProvider>
			<Grid className="layout">
				<Header alarmHandler={openHandler} />
				<Grid id="wrap">
					{children}
				</Grid>
			</Grid>
			<AlarmModal open={alarmOpen} closeHandler={()=>setAlarmOpen(false)} />
		</UserProvider>
	);
}

export default Layout;
