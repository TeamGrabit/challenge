import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUserState } from '../MVVM/Model/UserModel';


function UserRedirect() {
	const userData = useUserState();
	return (
		<div>
			{ userData.auth ? null : <Redirect to="/login">{alert(`로그인이 필요한 서비스입니다.`)}</Redirect> }
		</div>
	)
}

export default UserRedirect
