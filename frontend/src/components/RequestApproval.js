import React from 'react';
import { Button, Input, RadioGroup, FormControlLabel, Radio, TextareaAutosize } from '@material-ui/core';

function RequestApproval() {
	const handleCheck = () => { };
	return (
		<div className="background">
			<div className="title">
				승인 요청
			</div>
			<RadioGroup
				className="selectType"
				defaultValue="pass"
				row
				aria-label="type"
				name="type"
				defaultChecked="pass"
			>
				<FormControlLabel
					value="pass"
					control={<Radio color="primary" />}
					label="면제"
					labelPlacement="end"
				/>
				<FormControlLabel
					value="approval"
					control={<Radio color="primary" />}
					label="승인"
					labelPlacement="end"
				/>
			</RadioGroup>
			<TextareaAutosize
				className="data"
				rowsMin={10}
				rowsMax={10}
			/>
			<div className="setBtn">
				<Button className="selectBtn" type="button">보내기</Button>
				<Button className="selectBtn" type="button">취소</Button>
			</div>
		</div>
	);
}

export default RequestApproval;
