import { Socket } from 'socket.io';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';
import { ExamClientAuthDto } from '../dtos/client-auth.dto';

@Injectable()
export class RoomAuthorGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const auth = context.switchToWs().getClient<Socket>().handshake.auth as ExamClientAuthDto;
    const isAuthor = auth.role === 'author';

    if (!isAuthor) {
      throw WebSocketException.Forbidden('You are not the author of this room');
    }

    return true;
  }
}
