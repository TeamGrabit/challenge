import React, { useState } from 'react';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PwFindAuth from '../components/PwFindAuth';
import PwChange from '../components/PwChange';

function PwFind() {
	const [status, setStatus] = useState(false);
	return (
		<div className="pw-find">
			<div className="wrap">
				<div className="title">
					<div>비밀번호 찾기</div>
					<LockOpenIcon className="lock-icon" />
				</div>
				<div className="process">
					<div className={status ? "normal" : "highlight"}>이메일 인증</div>
					<ArrowForwardIosIcon className="arrow-icon" />
					<div className={!status ? "normal" : "highlight"}>비밀번호 재설정</div>
				</div>
			</div>
			<div className="line" />
			{status === false ?
				<PwFindAuth setStatus={setStatus} />
				: <PwChange />}
		</div>
	);
}
export default PwFind;
