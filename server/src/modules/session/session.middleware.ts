import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Redis } from 'ioredis';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import config from 'src/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  use(req: Request, res: Response, next: NextFunction) {
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      proxy: process.env.NODE_ENV === 'production' ? true : false,
      cookie: {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * config.SESSION_MAX_AGE,
      },
      store: new RedisStore({
        client: this.redisClient,
        prefix: 'session:',
        ttl: 60 * 60 * 24 * config.SESSION_MAX_AGE,
      }),
    })(req, res, next);
  }
}
