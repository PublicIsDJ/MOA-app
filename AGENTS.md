# Repository Guidelines

MOA-app(React + TypeScript + Vite) 컨트리뷰션 가이드입니다. 변경은 작게, 일관성 있게, 로컬에서 검증 후 PR을 올려주세요.

## 커뮤니케이션 원칙
- 모든 설명과 문서는 한국어를 우선합니다. 필요 시 핵심 용어만 괄호로 영문 병기합니다(예: 리다이렉트(redirect)).
- 에러 리포트/응답 시, 불필요한 전체 로그 대신 핵심만 인용하고 바로 실행 가능한 점검/수정 단계를 제시합니다.

## 네트워크 에러 대응 가이드
아래 템플릿에 따라 원인 파악과 해결을 빠르게 진행합니다.

- 핵심 추출(필수로 보여줄 항목)
  - 요청 URL·메서드: 예) GET https://kauth.kakao.com/oauth/authorize
  - 상태코드: 예) 400 Bad Request / 302 Found
  - 에러 코드·키 헤더: 예) error=invalid_scope, Location, CORS 관련 헤더
  - 스택/로그 첫 1~2줄(과다 인용 금지)

- 원인 후보(상황별 대표 케이스)
  - OAuth: Redirect URI 미등록/오탈자, 스코프 미허용(account_email 등), Additional Redirect 누락
  - 브라우저 라우팅: SPA 리다이렉트 미설정(Netlify `_redirects` 누락), 해시/브라우저 라우터 불일치
  - CORS/프록시: 302 Location 미노출로 자동 이동 실패 → 수동 리다이렉트 필요
  - ENV: Vite 노출 접두사(`VITE_`) 누락으로 런타임 값 비어 있음

- 즉시 점검 체크리스트
  - Kakao 콘솔: 웹 도메인(Origin), Redirect URI(정확히 일치), 동의 항목(스코프) 활성화
  - Supabase Auth: Site URL, Additional Redirect URLs(dev/prod) 등록
  - 프론트: `public/_redirects` 존재(`/* /index.html 200`), 라우터는 BrowserRouter 사용
  - ENV: `.env.local`에 `VITE_` 접두사 키 존재, 변경 후 dev 서버 재시작

- 수정 액션 예시
  - OAuth 시작 시 `skipBrowserRedirect: true` 후 `window.location.assign(data.url)`로 수동 이동
  - 필요한 스코프만 요청(`profile_nickname profile_image` 등), email 필요 시 콘솔에서 항목 활성화 후 추가
  - HashRouter → BrowserRouter 전환 시 `/auth/callback` 경로와 SPA 리다이렉트 동기화

- 학습 포인트(왜 그런가)
  - 302 리다이렉트는 프록시/브라우저 CORS 설정에 따라 Location 접근이 제한될 수 있음 → 수동 리다이렉트로 우회
  - `invalid_scope`는 제공자 콘솔의 동의 항목과 요청 스코프 불일치에서 발생
  - Vite는 `VITE_` 접두사만 클라이언트에 노출하므로 서버 키와 분리 필요

## 기술 스택
- React 19, TypeScript 5, Vite 7
- React Router DOM 7 (BrowserRouter)
- Supabase JS v2 (Auth/DB/Storage)
- TanStack Query v5 (서버 상태 관리)
- Zustand v5 (클라이언트 상태 관리)
- Axios (HTTP 클라이언트)
- Vite Plugin PWA + Workbox
- Tailwind CSS 4, shadcn 호환 토큰
- Kakao REST API (Supabase OAuth Provider 경유)
- 기타: date-fns, framer-motion, zxing (QR/스캔)

## 우선 작업 체크리스트(High Priority)
- Supabase 프로젝트 생성 → `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 발급·설정(`.env.local`).
- DB 스키마: `decks`, `cards`, `activities`, `qr_codes` 생성. RLS: `activities.user_id = auth.uid()`.
- FastAPI 스캐폴딩: `/api/scan/{token}`, `/api/analytics/*` 구현(서비스키/DB 연결).
- 프론트 인증 연동: `supabase-js` 세션 가드, 로그인/로그아웃 흐름.
- QR 생성(단기): `BASE_URL=<배포URL> npm run qrs` → `public/qrcodes/` 인쇄.
- CORS/도메인 허용: 프론트 ↔ FastAPI ↔ Supabase 상호 통신 허용.
- PWA 연결: `vite-plugin-pwa` 설정 + SW 등록 후 `npm run build && npm run preview`로 확인.

## 프로젝트 구조 & 모듈 구성
- `src/main.tsx` 앱 엔트리, `src/app/App.tsx` 루트 컴포넌트.
- `src/router/` 라우팅 설정(`index.tsx`). BrowserRouter 사용.
- `src/pages/cards/` 목록·상세(미션) 페이지.
- `src/features/<name>/` 피처 모듈(`api/`, `ui/`, `model/`, `lib/`, `index.ts`).
- `src/shared/lib/` 공용 유틸(`axios.ts`, `pwa.ts`). `public/`, `src/assets/` 정적 자산.

## 빌드·개발 명령
- `npm run dev` 개발 서버(HMR) · `npm run build` 빌드(+타입체크).
- `npm run preview` 프로덕션 빌드 프리뷰 · `npm run lint` ESLint.
- `npm run qrs` QR 일괄 생성. 예) `BASE_URL=https://app.example.com FORMAT=png npm run qrs`.

## 아키텍처(권장: Supabase + FastAPI)
- Supabase: 인증·Postgres·Storage·RLS. 카드덱·활동·공유·QR 토큰 저장을 일원화.
- FastAPI: AI 분석, QR 검증/리다이렉트, 배치 발급·통계 등 서버 로직 담당.
- ENV: `VITE_API_BASE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`(프론트); 서버는 서비스키/DB URL을 별도 관리(커밋 금지).

## 라우팅 & 배포
- Router: BrowserRouter 사용. 해시 라우터 금지.
- Netlify 배포 시 SPA fallback 필요: `public/_redirects` 파일에 `/* /index.html 200` 포함.
- OAuth 콜백 경로: `/auth/callback` (해시 미사용). Supabase Additional Redirects에 dev/prod 둘 다 등록.

## 상태 & 데이터(fetch)
- TanStack Query: 비동기 데이터 표준 레이어. 각 feature의 `api/`에서 쿼리/뮤테이션 훅을 노출.
  - 추후 전역 Provider: `src/app/providers/query.tsx`에 `QueryClientProvider` 구성 후 `App`에서 포함.
  - 쿼리 키는 `[feature, entity, params]` 규칙 사용.
- Zustand: 뷰-로컬/세션 범위 상태 관리. 각 feature의 `model/`에 `store.ts`를 두고 배럴(`index.ts`)로 노출.
  - 전역 공유 상태는 최소화, FSD 경계를 넘는 직접 접근 금지(배럴 경유).

## PWA 적용 가이드
- 플러그인: `vite-plugin-pwa` 사용. `vite.config.ts`에 `VitePWA({ registerType: 'autoUpdate', manifest: { name: 'MOA', short_name: 'MOA', start_url: '/', display: 'standalone', theme_color: '#ffffff', background_color: '#ffffff', icons: [ { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' } ] } })` 추가.
- SW 등록: `src/shared/lib/pwa.ts`에서 `import { registerSW } from 'virtual:pwa-register'` 후 `registerSW({ immediate: true })`. 엔트리(`src/main.tsx`)에서 한 번만 import.
- 아이콘: `public/icons/icon-192.png`, `public/icons/icon-512.png` 준비(투명 배경 권장).
- 오프라인: 최초 방문 후 미션 페이지(`/cards/*`)는 정적 리소스 캐시로 재방문 가능. 동적 API는 네트워크 필요.
- 테스트: `npm run build && npm run preview` → 브라우저 DevTools > Application > Service Workers에서 설치 확인.

## 코딩 스타일 & FSD
- 들여쓰기 2스페이스, UTF-8/LF, TS + 함수형 컴포넌트/훅.
- 네이밍 규칙: 폴더명 `kebab-case`(예: `cards-mission`), 파일명 `PascalCase`(예: `MissionForm.tsx`), 함수·변수 `camelCase`.
- 배럴: 각 슬라이스는 `index.ts`로 공개 API만 노출, 외부에서는 배럴만 import.
- FSD 레이어: `shared → features → pages → app`. 상향 의존 금지, 크로스-피처 직접 import 금지.

## FSD 구조 정리(리팩터 권장안)
- 도메인 슬라이스 예시: `features/auth`, `features/cards-mission`, `features/analytics`, `features/sharing`.
- 슬라이스 내부: `ui/`(컴포넌트), `model/`(상태·유효성), `api/`(HTTP), `lib/`(헬퍼), `index.ts`(공개 API).
- pages는 라우팅·조립만 담당하고 슬라이스를 통해서만 사용.
- entities는 도메인 최소 단위 표시/타입, widgets는 여러 feature를 묶는 섹션일 때만 사용.
- 임시 전환 계획: 1) `features/cards` → `features/cards-mission`로 명확화 2) cross-import를 배럴 경유로 교체 3) pages가 features 외 내부 폴더를 참조하지 않도록 정리.

## 보안 & 설정
- 비밀키(서비스키)·토큰은 저장소에 커밋 금지. HTTPS·CORS 엄격 관리.
- QR 정책: 단기 `/cards/:slug?v=1`(정적, 예: CD-001) → 장기 `/scan/{token}?v=2`(서버 검증)로 전환.
- HTTP 설정 중앙화: `src/shared/lib/axios.ts`.
