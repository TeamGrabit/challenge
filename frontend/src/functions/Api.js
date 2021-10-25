import React, { useContext, createContext } from 'react';
import axios from 'axios';
import { API_URL } from '../CommonVariable';
import { useCookies } from 'react-cookie';

// 모든 axios요청에 대해 withCredentials을 넣어줌 
// withCredentials = true 여야 backend에서 cookie에 접근 가능
// cookie에 JWT있음.
axios.defaults.withCredentials = true;

async function checkUser(){
    console.log("asdfheohfise");
    //const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const res = await axios.get(`${API_URL}/check`);
    console.log("yeah");
    return {
        ...res.data,
        auth: "user"
    };
}
export {checkUser};