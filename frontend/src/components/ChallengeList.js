import React from 'react';
import { Grid, Box, Link } from '@material-ui/core';

function ChallengeList({ list, value, index }) {
	return (
		<div>
			{value === index && (
				<div className="challengeList">
					<Grid container spacing={3} className="cha_list">
						{list.map((c) => (
							<Grid item lg={4} md={6} xs={12}>
								<Link className="link" href={`/challenge/info/${c.id}`}>
									<Box className="cha_box">
										{c.name}
									</Box>
								</Link>
							</Grid>
						))}
					</Grid>
				</div>
			)}
		</div>
	);
}

export default ChallengeList;
