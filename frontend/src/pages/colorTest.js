import React from 'react';
import { Box, Grid } from '@material-ui/core';

function colorTest() {
	return (
		<Grid container spacing={0} className="colorTest">
			<Grid container item xs={12}>
				<Grid item xs={5}>
					<Box className={`${`box`} ${`box1`}`}>
						ghost-white
					</Box>
				</Grid>
				<Grid item xs={5}>
					<Box className={`${`box`} ${`box2`}`}>
						antique-white
					</Box>
				</Grid>
			</Grid>
			<Grid container item xs={12}>
				<Grid item xs={2}>
					<Box className={`${`box`} ${`box3`}`}>
						green1
					</Box>
				</Grid>
				<Grid item xs={2}>
					<Box className={`${`box`} ${`box4`}`}>
						green2
					</Box>
				</Grid>
				<Grid item xs={2}>
					<Box className={`${`box`} ${`box5`}`}>
						green3
					</Box>
				</Grid>
				<Grid item xs={2}>
					<Box className={`${`box`} ${`box6`}`}>
						green4
					</Box>
				</Grid>
				<Grid item xs={2}>
					<Box className={`${`box`} ${`box7`}`}>
						green5
					</Box>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default colorTest;
