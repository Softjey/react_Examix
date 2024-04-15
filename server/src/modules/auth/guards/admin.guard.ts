import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new ForbiddenException('This route needs an authenticated user.');
    }

    if (request.user.role !== $Enums.Role.ADMIN) {
      throw new ForbiddenException('This route is only accessible by admins.');
    }

    return true;
  }
}
