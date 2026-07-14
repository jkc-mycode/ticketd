-- 오버셀 0 최종 안전장치: 활성(PENDING/CONFIRMED) 예매는 좌석당 1건
-- Prisma schema로 표현 불가한 partial unique index (수동 관리 — drift 주의)
CREATE UNIQUE INDEX "reservations_active_seat_key" ON "reservations" ("seatId") WHERE "status" <> 'CANCELED';
