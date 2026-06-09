# 곁에(Gyeote) — Claude Code 프로젝트 가이드

## 프로젝트 개요
1인 가구 생활 도움 매칭 서비스 마케팅 웹사이트.
저장소: github.com/seowoo92/rest04
배포: https://seowoo92.github.io/rest04/
로컬: ~/gyeote

## 기술 스택
- Vite + React + Tailwind CSS v4
- react-router-dom (basename="/rest04")
- lucide-react (아이콘, 이모지 사용 금지)
- 폰트: IBM Plex Sans KR (Google Fonts)

## 컬러 팔레트
라이트 모드 (:root): 배경 #FAF6F0 / 텍스트 #2A2D43 / 코랄 #FF6F5E / 머스타드 #F5B23E / 카드 #FFFFFF / 구분선 #ECE6DC
다크 모드 (.dark): 배경 #1E2030 / 텍스트 #F5F1EA / 코랄 #FF7E6E / 머스타드 #F7C04A / 카드 #2A2D43 / 구분선 #3A3E55
모든 색상은 CSS 변수(var(--bg), var(--text), var(--card), var(--divider))로 사용. 색상 하드코딩 금지.

## 디자인 규칙
- 이모지 절대 사용 금지, lucide-react 라인 아이콘만 사용
- 모션: 은은한 페이드/슬라이드만 (통통 튀는 효과 금지)
- 섹션 여백 넉넉히, 본문 최대 너비 안에서 가운데 정렬
- 모바일 반응형 필수
- 다크/라이트 토글 기본값: 라이트, 푸터는 항상 다크

## 파일 구조
src/assets/ - 이미지 (hero.jpg, logo.svg, logo-dark.svg)
src/components/ - Navbar.jsx, Footer.jsx, Layout.jsx, PageHeader.jsx, DarkGlow.jsx
src/context/ - ThemeContext.jsx
src/data/ - helpers.js, reviews.js (목 데이터, DB 교체 예정)
src/hooks/ - useSnapScroll.js
src/pages/ - Home.jsx, AboutCeo.jsx, AboutVision.jsx, AboutHistory.jsx, AboutBrand.jsx, Services.jsx, ServicesHow.jsx, Reviews.jsx, Contact.jsx
src/utils/ - submitContact.js
web_assets/ - GitHub 업로드 이미지
docs/devlog/ - 개발일지

## 라우트 구조
/ → Home
/about/ceo → AboutCeo
/about/vision → AboutVision
/about/history → AboutHistory
/about/brand → AboutBrand
/services → Services
/services/how → ServicesHow
/reviews → Reviews
/contact → Contact

## 네비바 메뉴 구조
- 회사소개: CEO 인사말, 비전·가치, 연혁, 브랜드 소개
- 서비스: 이용 방법, 전체보기
- 이용후기: 이용후기
- 문의하기: 문의하기

## 공통 컴포넌트 사용법
PageHeader: 모든 서브 페이지 상단에 사용
사용 예시: category="회사소개" title="CEO 인사말" bgText="CEO MESSAGE"
DarkGlow: Layout.jsx에서 자동 적용 (홈 제외, 다크모드일 때만 표시)

## 배포
- npm run build → dist/ 생성
- npm run deploy → gh-pages 브랜치 자동 배포
- GitHub Pages 브랜치: gh-pages
- SPA 404 처리: public/404.html 리다이렉트

## 개발 규칙
- 작업 완료 후 항상: git add . → git commit → git push
- 배포 시: npm run build && npm run deploy
- 개발일지: docs/devlog/YYYY-MM-DD.md 형식으로 작성
- 데이터는 src/data/ 배열로 분리 (나중에 DB 교체 예정)
