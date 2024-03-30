import { Socket } from 'socket.io';
import { RoomsService } from '../rooms.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ClientDataDto } from '../dtos/client-data.dto';
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';

@Injectable()
export class RoomAuthorGuard implements CanActivate {
  constructor(private readonly roomsService: RoomsService) {}

  canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient<Socket>();
    const { authorToken, roomId } = client.data as ClientDataDto;
    const isAuthor = authorToken && this.roomsService.isAuthorOfRoom(authorToken, roomId);

    if (!isAuthor) {
      throw WebSocketException.Forbidden('You are not the author of this room');
    }

    return true;
  }
}
