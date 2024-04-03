import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis(process.env.CACHE_URL);
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
