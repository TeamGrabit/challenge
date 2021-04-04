import React from 'react';
import { Grid } from '@material-ui/core';
import Header from './Header';

function Layout({ children }) {
	return (
		<>
			<Header />
			<Grid id="wrap">
				{children}
			</Grid>
		</>
	);
}

export default Layout;
