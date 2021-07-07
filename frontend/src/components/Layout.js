import React from 'react';
import { Grid } from '@material-ui/core';
import Header from './Header';
import { UserProvider } from '../MVVM/Provider';

function Layout({ children }) {
	return (
		<UserProvider>
			<Grid className="layout">
				<Header />
				<Grid id="wrap">
					{children}
				</Grid>
			</Grid>
		</UserProvider>
	);
}

export default Layout;
