import React, { useState } from 'react';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function IdFind() {
	const [status, setStatus] = useState(false);
	return (
		<div className="pw-find">
			<div className="wrap">
				<div className="title">
					<div>아이디 찾기</div>
					<LockOpenIcon className="lock-icon" />
				</div>
				<div className="process">
					<div className={status ? "normal" : "highlight"}>이메일 인증</div>
				</div>
			</div>
			<div className="line" />
            // TODO : 메일 적는 인풋, 버튼 만들고 누르면 메일로 아이디 전송되거나 / 해당 이메일로 가입된 아이디가 없습니다 뜨게 만들기
		</div>
	);
}
export default IdFind;
