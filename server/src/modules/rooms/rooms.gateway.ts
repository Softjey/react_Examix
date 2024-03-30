import {
  ConnectedSocket,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import { Socket } from 'socket.io';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsRoomsAuthenticator } from './utils/ws-rooms-authenticator';
import { RoomAuthorGuard } from './guards/room-author.guard';
import { ClientData } from './decorators/client-data.decorator';
import { WsExceptionsFilter } from 'src/utils/websockets/exceptions/ws-exceptions.filter';

@UseFilters(WsExceptionsFilter)
@WebSocketGateway({ namespace: 'join-room' })
export class RoomsGateway implements OnGatewayConnection {
  constructor(private readonly roomsService: RoomsService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    WsRoomsAuthenticator.authenticate(this.roomsService, client);

    client.join(client.handshake.query.roomId);
  }

  @UseGuards(RoomAuthorGuard)
  @SubscribeMessage('start-exam')
  startExam(@ClientData('roomId') roomId: string) {
    console.log('start-exam', roomId);
  }
}
