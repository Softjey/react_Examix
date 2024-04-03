import { Injectable, NestMiddleware } from '@nestjs/common';
import * as passport from 'passport';

@Injectable()
export class PassportMiddleware implements NestMiddleware {
  private readonly initMiddleware = passport.initialize();
  private readonly sessionMiddleware = passport.session();

  use(req: any, res: any, next: () => void) {
    this.initMiddleware(req, res, () => {
      this.sessionMiddleware(req, res, next);
    });
  }
}
