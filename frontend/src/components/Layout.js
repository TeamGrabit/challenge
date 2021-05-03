import React from 'react';
import { Grid } from '@material-ui/core';
import { Header } from '.';

function Layout({ children }) {
	return (
		<Grid className="layout">
			<Header />
			<Grid id="wrap">
				{children}
			</Grid>
		</Grid>
	);
}

export default Layout;
