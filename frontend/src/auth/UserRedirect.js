import React from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from '../components';
import { useUserState } from '../MVVM/Model/UserModel';

function UserRedirect() {
	const userData = useUserState();
	//Spinner를 넣고싶다....
	return (
		<div>
			{ userData.auth === "loading" ? <div/> : 
				userData.auth === "user" ? null : <Redirect to="/login">{alert(`로그인이 필요한 서비스입니다.`)}</Redirect> }
		</div>
	);
}
// 
export default UserRedirect
