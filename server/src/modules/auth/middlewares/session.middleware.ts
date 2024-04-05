import * as session from 'express-session';
import { Injectable, NestMiddleware } from '@nestjs/common';
import config from 'src/config';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private readonly expressSessionMiddleware = session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * config.SESSION_MAX_AGE,
    },
  });

  use(req: any, res: any, next: () => void) {
    this.expressSessionMiddleware(req, res, next);
  }
}
