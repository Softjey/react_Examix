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
    if (!(await authenticator.authenticate())) return;

    const auth = client.handshake.auth as ClientAuthDto;
    const { role, roomId } = auth;

    if (role === 'author') {
      return this.roomsService.joinAuthor(roomId, client.id);
    }

    const authorClient = await this.roomsService.getRoomAuthor(roomId);
    const [newStudent] = await this.roomsService.joinStudent(roomId, auth.studentName);
    this.server.to(authorClient).emit('student-joined', newStudent);
  }

  @UseGuards(RoomAuthorGuard)
  @SubscribeMessage('start-exam')
  startExam(@ClientAuth('roomId') roomId: string) {
    this.server.to(roomId).emit('exam-started');

    // Start exam logic

    this.server.timeout(1000 * 5).emit('question', {});
  }
}
