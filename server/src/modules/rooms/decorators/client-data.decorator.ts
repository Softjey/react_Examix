import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ClientDataDto } from '../dtos/client-data.dto';
import { Socket } from 'socket.io';

export const ClientData = createParamDecorator(
  (property: keyof ClientDataDto, context: ExecutionContext) => {
    const { data } = context.switchToWs().getClient<Socket>();

    return property ? data[property] : data;
  },
);
