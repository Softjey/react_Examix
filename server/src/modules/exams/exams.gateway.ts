import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsRoomsAuthenticator } from './utils/ws-rooms-authenticator';
import { RoomAuthorGuard } from './guards/room-author.guard';
import { ClientAuth } from '../../utils/websockets/decorators/client-auth.decorator';
import { WsExceptionsFilter } from 'src/utils/websockets/exceptions/ws-exceptions.filter';
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';
import { RoomStudentGuard } from './guards/room-student.guard';
import { ExamsService } from './exams.service';
import { ExamQuestion } from './entities/exam-question.entity';
import { ExamClientAuthDto } from './dtos/client-auth.dto';
import { QuestionAnswerDto } from './dtos/question-answer.dto';

@UseFilters(WsExceptionsFilter)
@WebSocketGateway({
  namespace: 'join-exam',
  cors: { origin: '*' },
})
export class ExamsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private readonly examsService: ExamsService) {}

  private async prepareQuestionForStudents(question: ExamQuestion, index: number) {
    const answers = question.answers.map(({ title }) => ({ title }));

    return { question, index, answers };
  }

  private async handleRole(client: Socket, auth: ExamClientAuthDto) {
    switch (auth.role) {
      case 'author':
        this.examsService.joinAuthor(auth.examCode, client.id);
        break;
      case 'student':
        const { author } = await this.examsService.getExam(auth.examCode);
        const [studentId, student] = await this.examsService.joinStudent(
          auth.examCode,
          auth.studentName,
          client.id,
        );

        this.server.to(author.clientId).emit('student-joined', { name: student.name });
        client.emit('student-joined', { id: studentId });
        break;
      default:
        throw WebSocketException.ServerError('Invalid auth role');
    }
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const authenticator = new WsRoomsAuthenticator(this.examsService, client);
    const { isAuthorized, auth } = await authenticator.authenticate();

    if (isAuthorized) {
      this.handleRole(client, auth);

      const { test, questions } = await this.examsService.getExam(auth.examCode);
      const testInfo = { test, questionsAmount: questions.length };

      client.join(auth.examCode);
      client.emit('test-info', testInfo);
    }
  }

  @UseGuards(RoomAuthorGuard)
  @SubscribeMessage('start-exam')
  async startExam(@ConnectedSocket() client: Socket, @ClientAuth('examCode') examCode: string) {
    const { status } = await this.examsService.getExam(examCode);

    if (status !== 'created') {
      throw WebSocketException.BadRequest('Exam is already started or finished');
    }

    await this.examsService.startExam(examCode);
    this.server.to(examCode).emit('exam-started');

    this.examsService.onQuestion(examCode, (question, questionIndex) => {
      const studentsQuestion = this.prepareQuestionForStudents(question, questionIndex);

      client.emit('question', question);
      client.broadcast.to(examCode).emit('question', studentsQuestion);
    });

    this.examsService.onExamFinish(examCode, () => {
      this.server.to(examCode).emit('exam-finished');
    });
  }

  @UseGuards(RoomStudentGuard)
  @SubscribeMessage('answer')
  async answerQuestion(
    @MessageBody() { studentId, questionIndex, answers }: QuestionAnswerDto,
    @ClientAuth('examCode') examCode: string,
  ) {
    const { status, currentQuestionIndex } = await this.examsService.getExam(examCode);

    if (status !== 'started') {
      throw WebSocketException.BadRequest('Exam is not started or already finished');
    }

    if (questionIndex !== currentQuestionIndex) {
      throw WebSocketException.BadRequest(
        `Wrong questionIndex. Your index: ${questionIndex}, current index: ${currentQuestionIndex}`,
      );
    }

    this.examsService.answerQuestion(examCode, studentId, answers);
  }
}
