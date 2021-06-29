const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const SecretKey = process.env.SECRET_KEY;

exports.createToken = function (user) {
    console.log(SecretKey);
    const token = jwt.sign({
            user_id: user.user_id,
            git_id: user.git_id,
        }
        , SecretKey, {
            expiresIn: '1h'
        }
    );
    return token;
};
    
// module.exports = {
//     sign: async (user) => {
//         // payload에 원하는 값 넣기 (지금은 예시임)
//         const payload = { 
//             user_id: user.user_id,
//             git_id: user.git_id,
//         };
        
//         const result = {
//             // sign 메소드를 통해 access token 발급
//             token: jwt.sign(payload, SecretKey, {
//                 algorithm : "HS256", // 해싱 알고리즘
//                 expiresIn : "1h", // 토큰 유효 기간
//                 issuer : "Bada" // 발행자
//             }),
//             refreshToken: randToken.uid(256)
//         };
//         return result;
//     },
//     verify: async (token) => {
//         let decoded;
//         try {
//             // verify 를 통해 값 decode
//             decoded = jwt.verify(token, secretKey);
//         } catch (err) {
//             if (err.message === 'jwt expired') {
//                 console.log('expired token');
//                 return TOKEN_EXPIRED;
//             } else if (err.message === 'invalid token') {
//                 console.log('invalid token');
//                 console.log(TOKEN_INVALID);
//                 return TOKEN_INVALID;
//             } else {
//                 console.log("invalid token");
//                 return TOKEN_INVALID;
//             }
//         }
//         return decoded;
//     }
// }