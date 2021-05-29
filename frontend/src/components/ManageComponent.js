import React from 'react';
import { Button, Grid, Box, Typography } from '@material-ui/core';

function ManageComponent({ value, index }) {
	return (
		<div>
			<div className="manageComponent">
				<div>
					{value === index && (
						<Box>
							<Typography>{value}</Typography>
						</Box>
					)}
				</div>
			</div>
		</div>
	);
}

export default ManageComponent;
