import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

function ExpelMember({ onClose, handleExpel, member }) {
	return (
		<div className="expelMember">
			<div className="doubleCheck">
				{`정말 "${member}"을(를)`}
				<br />
				<div>추방하시겠습니까?</div>
			</div>
			<div className="btn">
				<Button className="expelBtn" onClick={() => handleExpel(member)}>확인</Button>
				<Button className="cancelBtn" onClick={onClose}>취소</Button>
			</div>
		</div>
	);
}

export default ExpelMember;
