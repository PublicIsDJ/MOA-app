# 개발 컨벤션 및 실행 가이드

MOA-app(React + TypeScript + Vite)을 개발·유지보수할 때 따라야 할 실무 가이드입니다. 상세 아키텍처 규칙은 `AGENTS.md`를 참고하세요.

## 필수 요구사항
- Node.js 18 LTS 이상, npm 사용(레포에는 `package-lock.json` 포함).
- OS 공통: 터미널에서 명령은 레포 루트 기준으로 실행.

## 설치
- 의존성 설치: `npm ci` (속도·재현성 권장) 또는 `npm i`.

## 개발 서버 실행
- 시작: `npm run dev`
- 기본 주소: `http://localhost:5173`
- 포트 변경: `npm run dev -- --port 5174`

## 프로덕션 빌드 / 미리보기
- 빌드(+ 타입체크): `npm run build` → 산출물 `dist/`
- 빌드 미리보기(로컬 서빙): `npm run preview`

## 린트 / 포맷 실행법
- ESLint 전체 검사: `npm run lint`
- Prettier(권장) 일괄 포맷: `npx prettier -w .`
- 규칙은 `eslint.config.js`에 정의(React Hooks, TypeScript 권장 설정 적용). 오류는 커밋 전 해결.

## 네이밍 규칙
- 폴더명: `kebab-case` (예: `cards-mission`, `user-profile`).
- 파일명: `PascalCase` (예: `MissionForm.tsx`, `ProfileMenu.ts`).
- 함수·변수·훅: `camelCase` (예: `saveActivity`, `useAuthSession`).
- 공개 API: 각 슬라이스 루트의 `index.ts`에서만 export(배럴 패턴). 외부 모듈은 배럴만 import.

## 환경 변수
- Vite 규칙: 클라이언트 노출 변수는 `VITE_` 접두사 필요(예: `VITE_API_BASE_URL`).
- 파일: `.env.local`에 보관 후 `.gitignore` 유지. 민감정보 커밋 금지.

## 커밋 전 체크리스트
1) `npm run lint` 통과
2) `npm run build` 성공(타입 오류 없음)
3) 기능 단위로 작은 PR 구성, Conventional Commits 사용(예: `feat: QR 스캔 뷰 추가`).

## 트러블슈팅
- 포트 점유: `npm run dev -- --port 5174`로 다른 포트 사용.
- 빈 화면/리소스 404: 빌드 후에는 `npm run preview`로 확인(개발 서버와 경로 상이할 수 있음).
- 캐시 문제: 노드 모듈 재설치(`rm -rf node_modules && npm ci`), 브라우저 캐시 비우기.
