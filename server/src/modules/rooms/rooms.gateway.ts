import {
  ConnectedSocket,
  MessageBody,
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
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';
import { ExamEmitterException } from '../exams/utils/exam-emitter.exception';
import { QuestionAnswerDto } from './dtos/question-answer.dto';
import { RoomStudentGuard } from './guards/room-student.guard';

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

    client.join(auth.roomId);
    client.emit('test-info', testInfo);
  }

  @UseGuards(RoomAuthorGuard)
  @SubscribeMessage('start-exam')
  async tartExam(@ConnectedSocket() client: Socket, @ClientAuth('roomId') roomId: string) {
    const examEmitter = await this.roomsService.getExamEmitter(roomId);

    this.server.to(roomId).emit('exam-started');
    await examEmitter.startExam();

    examEmitter.onException(this.emitterExceptionHandler(roomId));
    examEmitter.onQuestion((question) => {
      client.emit('question', examEmitter.exam.questions[question.id]);
      client.broadcast.to(roomId).emit('question', question);
    });
  }

  @UseGuards(RoomStudentGuard)
  @SubscribeMessage('answer')
  async answerQuestion(
    @ConnectedSocket() client: Socket,
    @MessageBody() { questionId, answerIndexes }: QuestionAnswerDto,
    @ClientAuth('roomId') roomId: string,
  ) {
    const examEmitter = await this.roomsService.getExamEmitter(roomId);

    if (examEmitter.status !== 'started') {
      throw WebSocketException.BadRequest('Exam is not started');
    }

    const studentId = await this.roomsService.getStudentId(client.id, roomId);

    examEmitter.answerQuestion(studentId, questionId, answerIndexes);
  }

  emitterExceptionHandler(roomId: string) {
    return async (exception: ExamEmitterException) => {
      console.log('exception', exception);
      switch (exception.type) {
        case 'wrong-question-index': {
          const { studentId, questionIndex, currentQuestionIndex } = exception.details;
          const studentClientId = await this.roomsService.getStudentClientId(roomId, studentId);
          const message = `Wrong question index. Your index: ${questionIndex}, current index: ${currentQuestionIndex}`; // eslint-disable-line max-len

          throw WebSocketException.BadRequest(message, {
            client: this.server.sockets.sockets.get(studentClientId),
          });
        }
        default: {
          throw WebSocketException.ServerError();
        }
      }
    };
  }
}
