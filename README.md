# ticketd

고동시성 티켓팅 & 봇 방어 사이드 프로젝트 (NestJS + Prisma + PostgreSQL + Redis).

동시 폭주 상황의 재고 정합성(오버셀 0)과 대기열·결제 멱등성을 구현하고,
자작 매크로로 직접 공격한 뒤 방어 계층을 얹어 실효성을 수치로 검증한다.

설계 문서: `docs/active/ticketd-project-plan.md`
