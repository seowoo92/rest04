# 곁에(Gyeote) — Claude Code 프로젝트 가이드

## 프로젝트 개요
1인 가구 생활 도움 매칭 서비스 마케팅 웹사이트.
저장소: github.com/seowoo92/rest04
배포: https://seowoo92.github.io/rest04/
로컬 경로(맥미니): ~/gyeote

## 기술 스택
- Vite + React (vite.config.js에 `base: '/rest04/'` 설정)
- Tailwind CSS v4 (`@import "tailwindcss"`, `@tailwindcss/postcss`)
- react-router-dom (BrowserRouter, `basename="/rest04"`)
- lucide-react (아이콘 전용, 이모지 절대 사용 금지)
- 폰트: IBM Plex Sans KR (Google Fonts)

## 컬러 팔레트
라이트 모드 (:root): 배경 #FAF6F0 / 텍스트 #2A2D43 / 코랄 #FF6F5E / 머스타드 #F5B23E / 카드 #FFFFFF / 구분선 #ECE6DC
다크 모드 (.dark): 배경 #1E2030 / 텍스트 #F5F1EA / 코랄 #FF7E6E / 머스타드 #F7C04A / 카드 #2A2D43 / 구분선 #3A3E55

### 색상 사용 규칙
- 배경·텍스트·카드·구분선: 반드시 CSS 변수 사용 (`var(--bg)`, `var(--text)`, `var(--card)`, `var(--divider)`)
- 코랄·머스타드 포인트 색상: 직접 하드코딩 허용 (`#FF6F5E`, `#F5B23E`)
  - 이유: 다크모드에서도 브랜드 포인트 색은 동일하게 유지하는 것이 디자인 의도
- 별점 아이콘: `#FBBF24` (노란색, lucide Star의 fill/color에 사용)
- 아바타 4색 순환: `['#FF6F5E', '#F5B23E', '#7B68EE', '#9FC8DC']`

## 디자인 규칙
- 이모지 절대 사용 금지, lucide-react 라인 아이콘만 사용
- 모션: 은은한 페이드/슬라이드만 (통통 튀는 효과 금지)
- 섹션 여백 넉넉히, 본문 최대 너비 안에서 가운데 정렬
- 모바일 반응형 필수
- 다크/라이트 토글 기본값: 라이트, 푸터는 항상 다크
- 테마 상태는 localStorage에 저장됨 (`theme: 'dark' | 'light'`)

## 파일 구조
src/assets/ - 이미지 (hero.jpg, logo.svg, logo-dark.svg)
src/components/ - Navbar.jsx, Footer.jsx, Layout.jsx, PageHeader.jsx, DarkGlow.jsx
src/context/ - ThemeContext.jsx (다크모드 상태, localStorage 저장/복원)
src/data/ - helpers.js, reviews.js (목 데이터, 추후 DB 교체 예정)
src/hooks/ - useSnapScroll.js
src/pages/ - Home.jsx, AboutCeo.jsx, AboutVision.jsx, AboutHistory.jsx, AboutBrand.jsx, Services.jsx, ServicesHow.jsx, Reviews.jsx, Contact.jsx
src/utils/ - submitContact.js
web_assets/ - GitHub 업로드 원본 이미지
docs/devlog/ - 개발일지 (YYYY-MM-DD.md)

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

### PageHeader
모든 서브 페이지 상단에 사용. props: category, title, bgText
| 페이지 | category | title | bgText |
|--------|----------|-------|--------|
| AboutCeo | 회사소개 | CEO 인사말 | CEO MESSAGE |
| AboutVision | 회사소개 | 비전·가치 | VISION |
| AboutHistory | 회사소개 | 연혁 | HISTORY |
| AboutBrand | 회사소개 | 브랜드 소개 | BRAND |
| Services | 서비스 | 서비스 전체보기 | SERVICES |
| ServicesHow | 서비스 | 이용 방법 | HOW IT WORKS |
| Reviews | 이용후기 | 곁에를 경험한 분들 | REVIEWS |
| Contact | 문의하기 | 문의하기 | CONTACT |

### DarkGlow
Layout.jsx에서 자동 적용 (홈 `/` 제외, 모든 서브 페이지).
라이트/다크 모두 표시되며 모드에 따라 opacity만 다름.
- 구현: CSS radial-gradient div 2개 + @keyframes glowFloat1/glowFloat2
- position: fixed, zIndex: 0 — Layout 래퍼 div에 절대로 `position: relative` 추가하지 말 것
  (stacking context 생성 시 fixed 동작이 깨짐)

## 데이터 구조

### reviews.js 필드
```js
{ id, name, initial, rating, type, content, date }
// type 값: '가구 조립' | '벌레 처치' | '짐 옮기기' | '전구 교체' | '간단 청소' | '기타 생활 도움'
```

## 배포
- npm run build → dist/ 생성
- npm run deploy → gh-pages 브랜치 자동 배포
- GitHub Pages 브랜치: gh-pages
- SPA 404 처리: public/404.html에서 `sessionStorage.redirect`에 URL 저장 후 루트로 리다이렉트
  index.html에서 sessionStorage.redirect 읽어 원래 경로 복원

## 개발 규칙
- 작업 완료 후 항상: git add → git commit → git push
- 배포 시: npm run build && npm run deploy
- 개발일지: docs/devlog/YYYY-MM-DD.md 형식으로 작성
- 데이터는 src/data/ 배열로 분리 (나중에 DB 교체 예정)
- 새 페이지 추가 시: App.jsx 라우트 추가 + Navbar 메뉴 구조 확인
