import { HttpStatus } from '@nestjs/common';
import { Socket } from 'socket.io';
import { RoomsService } from '../rooms.service';

export class WsRoomsAuthenticator {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly client: Socket,
  ) {}

  authenticate() {
    const query = this.client.handshake.query;
    const roomId = Array.isArray(query.roomId) ? query.roomId[0] : query.roomId;

    if (!roomId || !this.roomsService.roomExist(roomId)) {
      this.client.emit('error', {
        status: HttpStatus.NOT_FOUND,
        message: 'roomId is missing or invalid',
      });

      return false;
    }

    return true;
  }
}
