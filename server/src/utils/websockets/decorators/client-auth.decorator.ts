import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ClientAuthorAuthDto } from '../../../modules/rooms/dtos/client-auth.dto';
import { Socket } from 'socket.io';

export const ClientAuth = createParamDecorator(
  (property: keyof ClientAuthorAuthDto, context: ExecutionContext) => {
    const { auth } = context.switchToWs().getClient<Socket>().handshake;

    return property ? auth[property] : auth;
  },
);
