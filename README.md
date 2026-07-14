# ticketd 🎟️

야구 티켓 예매를 소재로 **순간 폭주(flash sale) 상황의 고동시성 재고 정합성**을 다루는 백엔드 중심 사이드 프로젝트.
동시 수천 요청에서 오버셀 0을 보장하고, 대기열·결제 멱등성을 구현한 뒤,
**자작 매크로로 직접 공격하고 방어 계층을 얹어 실효성을 수치로 검증**한다.

## 핵심 아이디어

무게중심은 동시성 코어, 봇 방어는 그 위에 얹는 하이라이트 층.
핵심 결과물은 "자작 매크로의 좌석 선점 성공률이 방어 전후로 어떻게 떨어지는가"의 **before/after 곡선** —
주장이 아니라 측정이라 무너지지 않는다.

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| 백엔드 | NestJS · Prisma · PostgreSQL |
| 캐시/큐/락 | Redis (좌석 홀드 TTL · 대기열 토큰 · 레이트리밋 · 분산락) |
| 공유 | `@ticketd/shared-types` (enum · `I*` 인터페이스) |
| 부하/공격 | 자작 스크립트(loadbot) 또는 k6 |

## 구조

```
apps/server            NestJS + Prisma + Redis (동시성 코어)
packages/shared-types  공유 타입 (enum, I* 인터페이스)
tools/loadbot          자작 부하·매크로 (레드팀, M4)
```

## 마일스톤

| 단계 | 내용 |
|------|------|
| M1 | 동시성 코어 — 좌석 홀드/TTL · 오버셀 0 보장 · 부하 테스트 |
| M2 | 대기열 — Redis 토큰 대기열 · 순번 보장 |
| M3 | 결제 멱등성 — 중복 예매/결제 차단 (PG 모킹) |
| M4 | 레드팀 — 자작 매크로 공격 · before 수치 |
| M5 | 블루팀 — 레이트리밋·행동신호·대기열 게이트 · after 곡선 |

## 개발 환경 준비

```bash
pnpm install                 # 워크스페이스 링크 + 의존성 설치
docker compose up -d         # Postgres · Redis (의존성) — M1에서 추가 예정
```

## 실행

```bash
pnpm dev:server              # NestJS (개발, 핫리로드)
```

설계·현황은 `docs/active/ticketd-project-plan.md` (git 미포함 위키).
