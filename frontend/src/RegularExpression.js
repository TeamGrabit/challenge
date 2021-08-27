
// 아이디 비밀번호 정규식: 4~8자리 숫자
export const REGULAR_ID = /[0-9]{4,8}/g;



// 챌린지 비밀번호 정규식: 8~20자리 숫자, 영어, 특수문자(!@#*)
export const REGULAR_CHALLENGE = /[\w!@#*]{8,20}/g;



/*
    정규식 사용법

    ex) var compare = REGULAR_ID.exec(input)
        if (compare[0] === input) { 정규식에 일치함 }
        else { 정규식과 불일치 }
        
*/