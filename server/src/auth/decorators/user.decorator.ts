import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

export const User = createParamDecorator((property: keyof UserModel, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  if (property) {
    return request.user[property];
  }

  return request.user as UserModel;
});
