const jwt = require('jsonwebtoken');
require("dotenv").config();
const jwtSecret = process.env.SECRET_KEY;

function createToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: '30m'});
}
exports.createToken = createToken;

function decodeToken(token) {
    return jwt.verify(token, jwtSecret);
}

async function jwtMiddleware(req, res, next) {
    const token = req.cookies.user;
    console.log(token);
    if (!token) next(); // 토큰이 없으면 바로 종료

    try {
        const decoded = await decodeToken(token);
        //console.log(decoded); // iat: 발급 시점, exp: 만료 시점 (초 단위)
        const renewTiming = 5 * 60; // 토큰 만료 시간이 5분 남았으면 재발급
        //refreshToken 안 쓰는 방식. accessToken만 이용
        if (decoded.exp - Date.now()/1000 < renewTiming) {
            const { user_id, git_id } = decoded;
            const freshToken = createToken({ user_id, git_id });
            res.cookie('user', freshToken, { httpOnly: true, sameSite: 'none', secure: true });
        }
        req.user = decoded; // !!이후의 컨트롤러에서 req.user로 접근해서 user정보 확인하면됨
    } catch(e) {
        // token validation 실패 
        console.log(e); 
        console.log("token validation fail");
        req.user = null;
    }
    next();
}
exports.jwtMiddleware = jwtMiddleware;