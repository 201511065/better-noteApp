# betterEditor
## 1. 기획
  - 프론트 엔드 교육을 통해 배운 지식을 활용하여 개인 프로젝트를 진행
  - 기간 : 4월 27일 ~ 5월 24일
  - Rich_Text_Editor를 자바스크립트를 통해 개발
  - 예시

   <img width="859" alt="스크린샷 2022-04-25 오전 9 40 57" src="https://user-images.githubusercontent.com/26559739/165003825-0048a1fe-44ba-4796-8d6b-4877046dedde.png">

  - MVC 설계 기반으로 개발 진행
  - ESM 이용하여 개발
  - SPA(Single Page Application)
  - 프레임워크 사용 X
  - 핵심 비지니스 로직에 대한 unit test 필요
    - mocha 프레임워크 사용

## 2. 개발 환경 구성
  - HTML5 boilerplate 사용

## 3. 설계
  - 다이어그램

  <img width="720" alt="스크린샷 2022-05-03 오후 3 00 01" src="https://user-images.githubusercontent.com/26559739/166410397-9b98212f-9752-434a-843b-891082d93f10.png">

## 4. 기능 목록 정리

    a. text-editor 안에 들어갈 기능
      - 왼쪽 정렬
      - 가운데 정렬
      - 오른쪽 정렬
      - 텍스트 진하게(Bold)
      - 텍스트 기울이기(Italic)
      - 텍스트 언더라인(Underline)
      - 순서 리스트, 순서X 리스트 (동그란 점)
      - 하이퍼 링크
      - 이미지 첨부

    b. 심화기능
      - 편집 시 중간에 브라우저를 껐다가 켜도 다시 이어서 편집할 수 있도록 구현
      - localStorage 사용

## 5. Usage
  1. 구동 전 필요한 절차
     1. npm install 를 반드시 진행해주세요.
     2. index.html 에서 실행하시면 됩니다.
  2. Unit Test 실행 방법
     1. editorTest.mjs 에서 Unit Test를 진행할 수 있습니다.
     2. describe 안에 it 이 개별 테스트입니다.
        1. 한꺼번에 돌리고 싶을때는 describe를 테스트하고
        2. 개별로 돌리고 싶을떄는 it을 테스트하면 됩니다.
