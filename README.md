# betterEditor
## 1. 기획
  - 프론트 엔드 교육을 통해 배운 지식을 활용하여 개인 프로젝트를 진행
  - 기간 : 4월 27일 ~ 5월 24일
  - Rich_Text_Editor를 자바스크립트를 통해 개발 
  - 예시
   <img width="859" alt="스크린샷 2022-04-25 오전 9 40 57" src="https://user-images.githubusercontent.com/26559739/165003825-0048a1fe-44ba-4796-8d6b-4877046dedde.png">
   
  - 화면 디자인
   ![editor화면 디자인](https://user-images.githubusercontent.com/26559739/165198209-48daf113-035f-47e5-aa96-6948909a239b.jpeg)

  - MVC 설계 기반으로 개발 진행
  - ESM 이용하여 개발
  - SPA(Single Page Application) 
  - 프레임워크 사용 X
  - 핵심 비지니스 로직에 대한 unit test 필요

## 2. 개발 환경 구성
  - HTML5 boilerplate 사용

## 3. 설계
  - 다이어그램
  <img width="537" alt="스크린샷 2022-04-26 오후 5 32 10" src="https://user-images.githubusercontent.com/26559739/165257842-5637ef9f-43fe-46c7-91d5-bd58e48e0a43.png">
  
  - text-editor를 중점적으로 구현

## 4. 기능 목록 정리

    a. text-editor 안에 들어갈 기능
      - 왼쪽 정렬
      - 가운데 정렬
      - 오른쪽 정렬
      - 수평 정렬
      - 텍스트 진하게(Bold)
      - 텍스트 기울이기(Italic)
      - 텍스트 언더라인(Underline)
      - 순서 리스트, 순서X 리스트 (동그란 점)
      - 하이퍼 링크
      - 이미지 첨부
      - text 내용 저장 기능 (txt 확장자로 내컴퓨터에 저장) (시간에 따라 유동적으로 결정)
      - text 내용 취소 기능 (시간에 따라 유동적으로 결정)
      
    b. 심화기능
      - 편집 시 중간에 브라우저를 껐다가 켜도 다시 이어서 편집할 수 있도록 구현
      - localStorage 또는 sessionStorage 사용
