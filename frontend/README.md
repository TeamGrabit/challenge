# 1Challenge 프론트 엔드 문서

## 초기 설정법

1. eslint 설치
2. frontend 폴더와 backend 폴더 내에서 npm install

## components, pages 파일 규칙

1. pages는 말 그대로 한 페이지를 담당한다. route시 쓰임
2. components는 page에서 불러올 component들이 들어간다.
3. 파일을 생성하면 해당 폴더 내의 index.js안에서 export 해준다.

## scss 파일 규칙

1. base 폴더 내에는 전부다같이 쓸 설정이 담긴 scss가 들어 있다.
2. 각자 사용할 scss는 page용이면 pages, component 용이면 components 내에 만들어준다.
3. main.scss로 scss가 전체 적용되기 때문에 해당 파일 명으로 중첩 적용 해준다. _pages의 _main.scss, _colorTest.scss 참조
4. main.scss에서 import 해주면 js에서 불러올 필요 없이 파일에 적용된다.
5. 파일 이름 앞에 _붙은건 private라 main통해서만 가는 구조

## 전체 파일 구조

* src
	* components ( 컴포넌트 )
	* pages ( 페이지 전환 )
	* routes ( routing 정보 저장 )
	* css
	설명중
