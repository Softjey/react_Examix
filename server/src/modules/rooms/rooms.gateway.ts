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
import { ClientAuthDto } from './dtos/client-auth.dto';

@UseFilters(WsExceptionsFilter)
@WebSocketGateway({
  namespace: 'join-room',
  cors: { origin: '*' },
})
export class RoomsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const authenticator = new WsRoomsAuthenticator(this.roomsService, client);
    const isAuthorized = await authenticator.authenticate();
    const auth = client.handshake.auth as ClientAuthDto;

    if (!isAuthorized) return;
    if (auth.role === 'author') {
      this.roomsService.joinAuthor(auth.roomId, client.id);
    } else {
      const { roomId, studentName } = auth;
      const authorClient = await this.roomsService.getRoomAuthorClientId(roomId);
      const newStudent = await this.roomsService.joinStudent(roomId, studentName, client.id);

      this.server.to(authorClient).emit('student-joined', { name: newStudent.name });
      client.emit('student-joined', { id: newStudent.id });
    }

    const testInfo = await this.roomsService.getTestInfo(auth.roomId);

    client.emit('test-info', testInfo);
  }

  @UseGuards(RoomAuthorGuard)
  @SubscribeMessage('start-exam')
  startExam(@ConnectedSocket() client: Socket, @ClientAuth('roomId') roomId: string) {
    this.server.to(roomId).emit('exam-started');

    // Start exam logic
    this.server.timeout(1000 * 5).emit('question', {});
  }
}
