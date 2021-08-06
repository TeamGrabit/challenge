import React, { useState } from 'react';
import RegisterTerms from '../components/RegisterTerms';
import RegisterForm from '../components/RegisterForm';
import RegisterComplete from '../components/RegisterComplete';

function Register() {
	const [status, setStatus] = useState(0);
	console.log(status);
	return (
		<div className="register">
			{status === 0 ?
				<RegisterTerms changeStatus={setStatus} />
				: status === 1 ?
					<RegisterForm changeStatus={setStatus} />
					:
					<RegisterComplete />}

		</div>
	);
}
export default Register;
