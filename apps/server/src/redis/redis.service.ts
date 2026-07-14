import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  // 다른 프로젝트와 Redis 인스턴스를 공유하므로 모든 키에 prefix 강제
  readonly client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
      keyPrefix: 'ticketd:',
    });
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
