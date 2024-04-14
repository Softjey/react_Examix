import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      console.log(request.session);
      if (request.session.passport.user) {
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
