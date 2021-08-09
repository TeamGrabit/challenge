# challenge

여럿이서 1일 1커밋 챌린지에 도전해보세요.

(소개사진 넣기)

* [Contributors](#contributors)
* [개발 안내🚀](#개발-안내)
  1. [폴더 구조](#폴더구조)
  1. [기술 스택](#기술스택)
  1. [협업 규칙](#협업규칙)
* [문의사항📧](#문의사항)
* 다른 목차

-----------

## Contributors

### FE

[tnghd5761(강수홍)](https://github.com/tnghd5761)

### BE

[Hyun-git(이현광)](https://github.com/Hyun-git)

### FULLSTACK

[MOBUMIN(김수빈)](https://github.com/MOBUMIN)

[qf9ar8nv(차현철)](https://github.com/qf9ar8nv)

[sally0226(김바다)](https://github.com/sally0226)

-----------

## 개발 안내

### 폴더구조

backend

```backend
- backend/
--- config/
------ key.js (determine dev, prod)
------ dev.js (for local test)
------ prod.js (for production)
--- controllers/
------ approveController.js
------ authMailController.js
------ challengeController.js
------ controller.js
------ gitDataController.js
------ grassController.js
------ userController.js
--- functions/
------ crawling.js
--- models/
------ approveModel.js
------ authMailModel.js
------ challengeModel.js
------ gitDataModel.js
------ model.js
------ userModel.js
--- routes/
------ routes.js
--- app.js
```

frontend

```frontend
- frontend/
--- public
--- src/
------ assets
------ components
------ css
------ functions
------ MVVM 
------ pages
------ routes
------ App.js
------ CommonVariable.js
```

### 기술스택

* backend
  * node.js
  * express.js
  * MongoDB
  * Heroku
  * MVC Pattern

* frontend
  * React.js
  * Scss
  * MaterialUI
  * axios
  * contextAPI + MVVM Pattern

-----------

## 협업규칙

### main branch

`https://alsolvechallenge.herokuapp.com/` 에 배포된다.

`API_URL` 역시 `https://alsolvechallenge.herokuapp.com/` 이다.

localhost에서는 위의 주소로 API 요청을 보낼 수 없다.

### develop branch

`https://challengeback.herokuapp.com/` 에 배포된다.

`API_URL`이 `https://alsolvechallenge.herokuapp.com/` 라서 위 주소의 프론트-백 통신은 불가능하다.

localhost에서 `https://challengeback.herokuapp.com/`로 통신은 가능하다.

추후, cors orgin을 여러개 설정할 수 있게 하여 통신 가능하게 만들면 좋을듯 함.

develop branch에 branch를 merge한 후, 이상이 없을 때 main branch로 합친다.

-----------

## 문의사항

📧 email : kiju23@naver.com

written by MOBUMIN
