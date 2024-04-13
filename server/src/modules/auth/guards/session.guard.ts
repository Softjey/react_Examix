import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      if (request.session.passport.user) {
        return true;
      }
    } catch (e) {
      console.log('SessionGuard error: ', request.session.passport.user);
      throw new UnauthorizedException();
    }
  }
}
