import { ConnectedSocket, OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import { Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsRoomsAuthenticator } from './utils/ws-rooms-authenticator';

@UseGuards(WsRoomsAuthenticator)
@WebSocketGateway({ namespace: 'join-room' })
export class RoomsGateway implements OnGatewayConnection {
  constructor(private readonly roomsService: RoomsService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    const wsRoomsAuthenticator = new WsRoomsAuthenticator(this.roomsService, client);
    const isAuthorized = wsRoomsAuthenticator.authenticate();

    if (!isAuthorized) {
      client.disconnect();
    }

    const { roomId } = client.handshake.query;

    client.join(roomId);
  }
}
