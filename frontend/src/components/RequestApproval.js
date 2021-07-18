import React from 'react';
import { Button, Input, RadioGroup, FormControlLabel, Radio, TextareaAutosize } from '@material-ui/core';
import { } from '../MVVM/ViewModel/ChallengeViewModel';

function RequestApproval({ onClose, ch_id, user_id, date }) {
	const handleCheck = () => { };
	const [Type, setType] = useState(0)
	const [Message, setMessage] = useState("")
	const submitApprove = () => {};

	const chooseExemption = () => {
		setType(0);
	};
	const chooseApprove = () => {
		setType(1);
	};
	const changeMessage = (e) => {
		setMessage(e.currentTarget.value);
	};
	const submitApprove = async () => {};
	return (
		<div className="requestApproval">
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
					className="typeLabel"
					value="pass"
					control={<Radio className="radioBtn" color="primary" />}
					label="면제"
					labelPlacement="end"
				/>
				<FormControlLabel
					className="typeLabel"
					value="approval"
					control={<Radio className="radioBtn" color="primary" />}
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
				<Button className="selectBtn" type="button" onClick={submitApprove}>취소</Button>
				<Button className="selectBtn" type="button" onClick={onClose}>보내기</Button>
			</div>
		</div>
	);
}

export default RequestApproval;
