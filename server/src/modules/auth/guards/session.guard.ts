import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      console.log('Request user: ', request.user);
      console.log(request);
      if (request.session.passport.user) {
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException('Unauthorized. Please log in.');
    }
  }
}
