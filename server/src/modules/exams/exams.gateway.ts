import { ConnectedSocket, MessageBody, OnGatewayConnection } from '@nestjs/websockets';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsExamsAuthenticator } from './utils/ws-exams-authenticator';
import { ClientAuth } from '../../utils/websockets/decorators/client-auth.decorator';
import { WsExceptionsFilter } from 'src/utils/websockets/exceptions/ws-exceptions.filter';
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';
import { ExamManagementService } from './services/exams-management.service';
import { ExamQuestion } from './entities/exam-question.entity';
import { ExamClientAuthDto } from './dtos/client-auth.dto';
import { QuestionAnswerDto, StudentAnswer } from './dtos/question-answer.dto';
import { RoomAuthorGuard } from './guards/room-author.guard';
import { RoomStudentGuard } from './guards/room-student.guard';

@UseFilters(WsExceptionsFilter)
@UsePipes(new ValidationPipe())
@WebSocketGateway({
  namespace: 'join-exam',
  cors: { origin: '*' },
})
export class ExamsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private readonly examsService: ExamManagementService) {}

  private prepareQuestionForStudents(question: ExamQuestion, index: number) {
    const answers: StudentAnswer[] = question.answers.map(({ title }) => ({ title }));

    return { ...question, index, answers };
  }

  private async handleRole(client: Socket, auth: ExamClientAuthDto) {
    switch (auth.role) {
      case 'author':
        await this.examsService.joinAuthor(auth.examCode, client.id);
        break;
      case 'student':
        const { author } = await this.examsService.getExam(auth.examCode);
        const [studentId, { clientId, name }] = await this.examsService.joinStudent(
          auth.examCode,
          auth.studentName,
          client.id,
        );

        this.server.to(author.clientId!).emit('student-joined', { name, clientId });
        client.emit('student-joined', { id: studentId });
        break;
      default:
        throw WebSocketException.ServerError('Invalid auth role');
    }
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const authenticator = new WsExamsAuthenticator(this.examsService, client);
    const { isAuthorized, auth } = await authenticator.authenticate();

    if (isAuthorized) {
      await this.handleRole(client, auth);

      const { test, questions } = await this.examsService.getExam(auth.examCode);
      const testInfo = { ...test, questionsAmount: questions.length };

      client.join(auth.examCode);
      client.emit('test-info', testInfo);
    }
  }

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

    const studentExist = await this.examsService.answerQuestion(examCode, studentId, answers);

    if (!studentExist) {
      throw WebSocketException.BadRequest('Student id is invalid. You are not in the exam room');
    }
  }
}
