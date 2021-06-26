import React, { useState } from 'react';
import RegisterTerms from '../components/RegisterTerms';
import RegisterForm from '../components/RegisterForm';

function Register() {
	const [status, setStatus] = useState(0);
	console.log(status);
	return (
		status === 0 ?
			<RegisterTerms changeStatus={setStatus} /> : <RegisterForm changeStatus={setStatus} />
	);
}
export default Register;
