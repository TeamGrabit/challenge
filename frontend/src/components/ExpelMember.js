import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

function ExpelMember({ onClose, member }) {
	return (
		<div className="expelMember">
			정말
			{member}
			를 추방하시겠습니까?
		</div>
	);
}

export default ExpelMember;
