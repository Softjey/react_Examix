import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsExamsAuthenticator } from './utils/ws-exams-authenticator/ws-exams-authenticator';
import { ClientAuth } from '../../utils/websockets/decorators/client-auth.decorator';
import { WsExceptionsFilter } from 'src/utils/websockets/exceptions/ws-exceptions.filter';
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';
import { ExamManagementService } from './services/exams-management.service';
import { ExamQuestion } from './entities/exam-question.entity';
import { ExamClientAuthDto } from './dtos/client-auth.dto';
import { QuestionAnswerDto, StudentAnswer } from './dtos/question-answer.dto';
import { RoomAuthorGuard } from './guards/room-author.guard';
import { RoomStudentGuard } from './guards/room-student.guard';
import { KickStudentDto } from './dtos/kick-student.dto';

@UseFilters(WsExceptionsFilter)
@UsePipes(new ValidationPipe())
@WebSocketGateway({
  namespace: 'join-exam',
  cors: { origin: '*' },
})
export class ExamsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly examsService: ExamManagementService) {}

  private prepareQuestionForStudents(question: ExamQuestion, index: number) {
    const answers: StudentAnswer[] = question.answers.map(({ title }) => ({ title }));

    return { ...question, index, answers };
  }

  private async handleRole(authenticator: WsExamsAuthenticator, client: Socket) {
    const auth = client.handshake.auth as ExamClientAuthDto;

    switch (auth.role) {
      case 'author':
        await this.examsService.joinAuthor(auth.examCode, client.id);
        break;
      case 'student':
        const [status, studentId] = await authenticator.authorizeStudent(auth);
        const { author, students } = await this.examsService.getExam(auth.examCode);

        switch (status) {
          case 'error':
            break;
          case 'new':
            if (!students[studentId]) {
              throw WebSocketException.ServerError('Student was not created', {
                payload: { studentId, auth },
              });
            }

            const { studentToken, name } = students[studentId];
            this.server.to(author.clientId!).emit('student-joined', { name, studentId });
            client.emit('student-joined', { studentId, studentToken });
            break;
          case 'reconnected':
            client.emit('student-reconnected');
            break;
        }
        break;
      default:
        throw WebSocketException.ServerError('Invalid auth role');
    }
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const authenticator = new WsExamsAuthenticator(this.examsService, this.server, client);
    const { isAuthenticated, auth } = await authenticator.authenticate();

    if (isAuthenticated) {
      await this.handleRole(authenticator, client);

      const exam = await this.examsService.getExam(auth.examCode);

      client.join(auth.examCode);
      client.emit('connected', {
        message: 'You are connected to the exam room',
        test: exam.test,
      });
    }
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const { examCode } = client.handshake.auth as ExamClientAuthDto;
    const room = await this.server.in(examCode).fetchSockets();
    const exam = await this.examsService.getExam(examCode, true);

    if (exam && room.length === 0 && exam.status !== 'started') {
      await this.examsService.deleteExam(examCode);
    }
  }

  @UseGuards(RoomAuthorGuard)
  @SubscribeMessage('get-results')
  sendResults(client: Socket, examCode: string) {
    this.examsService.getResults(examCode).then((results) => {
      client.emit('results', results);
    });
  }

  @UseGuards(RoomAuthorGuard)
  @SubscribeMessage('start-exam')
  async startExam(@ConnectedSocket() client: Socket, @ClientAuth('examCode') examCode: string) {
    const { status, students } = await this.examsService.getExam(examCode);

    if (status !== 'created') {
      throw WebSocketException.BadRequest('Exam is already started or finished');
    }

    if (Object.keys(students).length === 0) {
      throw WebSocketException.BadRequest('There are no students in the exam');
    }

    await this.examsService.startExam(examCode);
    this.server.to(examCode).emit('exam-started');

    this.examsService.onQuestion(examCode, (question, questionIndex) => {
      const studentsQuestion = this.prepareQuestionForStudents(question, questionIndex);

      if (questionIndex > 0) {
        this.sendResults(client, examCode);
      }

      client.broadcast.to(examCode).emit('question', studentsQuestion);
    });

    this.examsService.onExamFinish(examCode, async (detailedExamPromise) => {
      client.broadcast.to(examCode).emit('exam-finished');
      client.broadcast.in(examCode).disconnectSockets(true);
      detailedExamPromise.then((detailedExam) => {
        client.emit('exam-finished', detailedExam);
        client.leave(examCode);
        client.disconnect(true);
      });
    });
  }

  @UseGuards(RoomStudentGuard)
  @SubscribeMessage('answer')
  async answerQuestion(
    @MessageBody() { studentToken, studentId, questionIndex, answers }: QuestionAnswerDto,
    @ClientAuth('examCode') examCode: string,
  ) {
    const { status, currentQuestionIndex, students } = await this.examsService.getExam(examCode);

    if (status !== 'started') {
      throw WebSocketException.BadRequest('Exam is not started or already finished');
    }

    if (students[studentId].studentToken !== studentToken) {
      throw WebSocketException.Forbidden('Student token is invalid');
    }

    if (questionIndex !== currentQuestionIndex) {
      throw WebSocketException.BadRequest(
        `Wrong questionIndex. Your index: ${questionIndex}, current index: ${currentQuestionIndex}`,
      );
    }

    const studentExist = await this.examsService.answerQuestion(examCode, studentId, answers);

    if (!studentExist) {
      throw WebSocketException.BadRequest('Student id is invalid. You are not in the exam room');
    }
  }

  @UseGuards(RoomAuthorGuard)
  @SubscribeMessage('kick-student')
  async kickStudent(
    @MessageBody() { studentId }: KickStudentDto,
    @ClientAuth('examCode') examCode: string,
    @ConnectedSocket() client: Socket,
  ) {
    const exam = await this.examsService.getExam(examCode);

    if (exam.status !== 'created') {
      throw WebSocketException.BadRequest('You can not kick student after exam started');
    }

    const deletedStudentClientId = await this.examsService.kickStudent(examCode, studentId);

    if (!deletedStudentClientId) {
      throw WebSocketException.NotFound('Student with this id is not in the exam');
    }

    this.server.to(deletedStudentClientId).emit('student-kicked', { studentId });
    this.server.to(deletedStudentClientId).disconnectSockets(true);

    client.emit('student-kicked', { studentId });
  }
}
