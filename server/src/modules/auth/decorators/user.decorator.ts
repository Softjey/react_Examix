import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

export const User = createParamDecorator((property: keyof UserModel, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const user = request.user as UserModel;

  if (property) {
    return request.user[property];
  }

  return user;
});
