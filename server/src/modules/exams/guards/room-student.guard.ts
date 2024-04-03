import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ExamClientAuthDto } from '../dtos/client-auth.dto';
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';

export class RoomStudentGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { role } = context.switchToWs().getClient<Socket>().handshake.auth as ExamClientAuthDto;

    if (role !== 'student') {
      throw WebSocketException.Forbidden('This action is only allowed for students.');
    }

    return true;
  }
}
