module.exports = {
    secretKey : "MySeCrEtKeY", // 원하는 시크릿 키 지정
    option : {
        algorithm : "HS256", // 해싱 알고리즘
        expiresIn : "30m", // 토큰 유효 기간
        issuer : "issuer" // 발행자
    }
}