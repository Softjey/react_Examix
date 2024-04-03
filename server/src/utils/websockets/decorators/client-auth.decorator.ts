import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Socket } from 'socket.io';

export const ClientAuth = createParamDecorator(function <T extends Record<string, any>>(
  property: keyof T,
  context: ExecutionContext,
) {
  const auth = context.switchToWs().getClient<Socket>().handshake.auth as T;

  return property ? auth[property] : auth;
});
