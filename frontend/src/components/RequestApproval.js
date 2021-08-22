import React, { useState } from 'react';
import { Button, Input, RadioGroup, FormControlLabel, Radio, TextareaAutosize } from '@material-ui/core';
import { useCreateApprove } from '../MVVM/ViewModel/ApproveViewModel';

function RequestApproval({ onClose, challengeId, userId, year, month, day }) {
	const createApprove = useCreateApprove();
	const [Type, setType] = useState(0);
	const [Message, setMessage] = useState("");
	const chooseApprove = () => {
		setType(0);
	};
	const chooseVacation = () => {
		setType(1);
	}
	const changeMessage = (e) => {
		setMessage(e.currentTarget.value);
	};
	const submitApprove = async () => {
		const approveInfo = {
			ch_id: challengeId,
			user_id: userId,
			type: Type,
			message: Message,
			request_date: `${year}-${month}-${day}`
		};
		const response = await createApprove(approveInfo, onClose);
		if (response === undefined || response.result === false) {
			alert('요청 실패');
		} else {
			alert('요청 성공');
		}
	};
	return (
		<div className="requestApproval">
			<div className="title">
				승인 요청
			</div>
			<RadioGroup
				className="selectType"
				defaultValue="approval"
				row
				aria-label="type"
				name="type"
				defaultChecked="approval"
			>
				<FormControlLabel
					className="typeLabel"
					value="approval"
					control={<Radio className="radioBtn" color="primary" />}
					label="승인"
					labelPlacement="end"
					onClick={chooseApprove}
				/>
				<FormControlLabel
					className="typeLabel"
					value="vacation"
					control={<Radio className="radioBtn" color="primary" />}
					label="청원휴가"
					labelPlacement="end"
					onClick={chooseVacation}
				/>
			</RadioGroup>
			<TextareaAutosize
				className="data"
				rowsMin={10}
				rowsMax={10}
				onChange={changeMessage}
			/>
			<div className="setBtn">
				<Button className="selectBtn" type="button" onClick={onClose}>취소</Button>
				<Button className="selectBtn" type="button" onClick={submitApprove}>보내기</Button>
			</div>
		</div>
	);
}

export default RequestApproval;
