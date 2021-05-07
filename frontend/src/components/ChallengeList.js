import React from 'react';
import { Grid, Box } from '@material-ui/core';

function ChallengeList({ list, value, index }) {
	return (
		<div>
			{value === index && (
				<div className="challengeList">
					<Grid container spacing={3} className="cha_list">
						<Grid item xs={3}>
							<Box className="cha_box">
								{list[0]}
							</Box>
						</Grid>
						<Grid item xs={3}>
							<Box className="cha_box">
								{list[1]}
							</Box>
						</Grid>
						<Grid item xs={3}>
							<Box className="cha_box">
								{list[2]}
							</Box>
						</Grid>
					</Grid>
				</div>
			)}
		</div>
	);
}

export default ChallengeList;
