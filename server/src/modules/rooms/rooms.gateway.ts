import {
  ConnectedSocket,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import { Server, Socket } from 'socket.io';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsRoomsAuthenticator } from './utils/ws-rooms-authenticator';
import { RoomAuthorGuard } from './guards/room-author.guard';
import { ClientAuth } from '../../utils/websockets/decorators/client-auth.decorator';
import { WsExceptionsFilter } from 'src/utils/websockets/exceptions/ws-exceptions.filter';

@UseFilters(WsExceptionsFilter)
@WebSocketGateway({
  namespace: 'join-room',
  cors: { origin: '*' },
})
export class RoomsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const isAuthorized = await WsRoomsAuthenticator.authenticate(this.roomsService, client);
    if (!isAuthorized) return;

    console.log(client.handshake.auth);
  }

  @UseGuards(RoomAuthorGuard)
  @SubscribeMessage('start-exam')
  startExam(@ClientAuth('roomId') roomId: string) {
    console.log('start-exam', roomId);
  }
}
