# Repository Guidelines

MOA-app(React + TypeScript + Vite) 컨트리뷰션 가이드입니다. 변경은 작게, 일관성 있게, 로컬에서 검증 후 PR을 올려주세요.

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
- `src/router/` 라우팅 설정(`index.tsx`).
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

## PWA 적용 가이드
- 플러그인: `vite-plugin-pwa` 사용. `vite.config.ts`에 `VitePWA({ registerType: 'autoUpdate', manifest: { name: 'MOA', short_name: 'MOA', start_url: '/#/', display: 'standalone', theme_color: '#ffffff', background_color: '#ffffff', icons: [ { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' } ] } })` 추가.
- SW 등록: `src/shared/lib/pwa.ts`에서 `import { registerSW } from 'virtual:pwa-register'` 후 `registerSW({ immediate: true })`. 엔트리(`src/main.tsx`)에서 한 번만 import.
- 아이콘: `public/icons/icon-192.png`, `public/icons/icon-512.png` 준비(투명 배경 권장).
- 오프라인: 최초 방문 후 미션 페이지(`/#/cards/*`)는 정적 리소스 캐시로 재방문 가능. 동적 API는 네트워크 필요.
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
- QR 정책: 단기 `/#/cards/:slug?v=1`(정적, 예: CD-001) → 장기 `/scan/{token}?v=2`(서버 검증)로 전환.
- HTTP 설정 중앙화: `src/shared/lib/axios.ts`.
