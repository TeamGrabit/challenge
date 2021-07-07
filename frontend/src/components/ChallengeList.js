import React from 'react';
import { Button, Grid, Box, Link } from '@material-ui/core';

function ChallengeList({ list, index }) {
	return (
		<div>
			<div className="challengeList">
				<Grid container spacing={3} className="cha_list">
					{list.map((c, i) => (
						index === c.state &&
						<Grid item lg={3} md={4} sm={6} xs={12}>
							<Link className="link" href={`/challenge/info/${i}`}>
								<div className="cha_box">
									<Box className="cha_inner">
										<div className="inner_text">
											{c.name}
										</div>
										<div className="wheel">
											<Link className="link" href={`/challenge/manage/${i}`}>
												<img className="cha_manage" src="/image/바퀴black.png" alt="설정" />
											</Link>
										</div>
									</Box>
								</div>
							</Link>
						</Grid>
					))}
					{index === 0 && (
						<Grid item lg={3} md={4} sm={6} xs={12}>
							<Link className="link" href="/challenge/make">
								<div className="cha_box">
									<Box className="cha_make">
										<div className="inner_text">
											+ Add a new challenge
										</div>
									</Box>
								</div>
							</Link>
						</Grid>
					)}
				</Grid>
			</div>
		</div>
	);
}

export default ChallengeList;
