import React from 'react'
import { Grid, Box, Button } from '@material-ui/core';

function ResignComponent({ challengeData, loading }) {
	
	return (
		<div className="resignComponent">
			<div className="comp_box">
				<div className="title_box">
					<div className="comp_title">챌린지 멤버</div>
					<Button className="resignBtn">탈퇴</Button>
				</div>
				<div className="content_box">
					<Grid container spacing={1}>
						{challengeData.challenge_users.map((c) => (
							<Grid item lg={3} md={4} sm={6} xs={12}>
								<div className="member_box">
									<Box className="member_inner" value={c}>
										{c}
									</Box>
								</div>
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</div>
	)
}

export default ResignComponent
