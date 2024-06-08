import { Server, Socket } from 'socket.io';
import { WsExceptionsFilter } from 'src/utils/websockets/exceptions/ws-exceptions.filter';
import { WebSocketException as WSException } from 'src/utils/websockets/exceptions/websocket.exception'; // eslint-disable-line
import { ClientAuthorAuthDto, ClientStudentAuthDto } from '../../dtos/client-auth.dto';
import { ExamClientAuthDto } from '../../dtos/client-auth.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ExamManagementService } from '../../services/exams-management.service';
import { Author } from '../../entities/author.entity';
import { Student } from '../../entities/student.entity';
import { AuthorizeStudentReturnType } from './ws-exams-authenticator.types';
import { Exam } from '../../entities/exam.entity';

export class WsExamsAuthenticator {
  constructor(
    private readonly examsService: ExamManagementService,
    private readonly server: Server,
    private readonly client: Socket,
  ) {}

  async authenticate() {
    await this.validateAuthDto();
    const isAuthenticated = await this.handleAuthorizationErrors();

    return { isAuthenticated, auth: this.client.handshake.auth as ExamClientAuthDto };
  }

  async authorizeStudent(auth: ClientStudentAuthDto): AuthorizeStudentReturnType {
    const { client } = this;
    const { studentId, studentName, examCode } = auth;
    const { students, status } = await this.examsService.getExam(auth.examCode);

    if (!studentId) {
      if (this.hasStudentExamStartedError(status)) {
        return ['error', null];
      }

      const [studentId] = await this.examsService.joinNewStudent(
        auth.examCode,
        auth.studentName,
        this.client.id,
      );

      return ['new', studentId];
    }

    const student = students[studentId];

    if (this.hasStudentErrors(student, auth)) {
      return ['error', null];
    }

    const [oldId] = await this.examsService.updateStudentClientId(
      examCode,
      studentId,
      studentName,
      client.id,
    );
    const [oldSocket] = await this.server.in(oldId).fetchSockets();

    if (oldSocket) {
      WsExceptionsFilter.handleError(
        oldSocket as unknown as Socket,
        WSException.Conflict('New client connected with that studentId', { disconnect: true }),
      );
    }

    return ['reconnected', studentId];
  }

  private handleError(error: WSException) {
    WsExceptionsFilter.handleError(this.client, error);

    return false;
  }

  private hasStudentExamStartedError(status: Exam['status']) {
    if (status !== 'created') {
      return !this.handleError(
        WSException.BadRequest('Exam is already started or finished', {
          disconnect: true,
        }),
      );
    }

    return false;
  }

  private hasStudentErrors(student: Student, auth: ClientStudentAuthDto) {
    if (!student) {
      return !this.handleError(
        WSException.NotFound('Student not found. Please, check the student id', {
          disconnect: true,
        }),
      );
    }

    if (!auth.studentToken || student.studentToken !== auth.studentToken) {
      return !this.handleError(
        WSException.BadRequest('Student token is required or invalid, if you provided studentId ', {
          disconnect: true,
        }),
      );
    }

    return false;
  }

  private async handleAuthorizationErrors() {
    const auth = this.client.handshake.auth as ExamClientAuthDto;

    if (await this.hasRoomNotFoundError(auth)) return false;

    const { author } = await this.examsService.getExam(auth.examCode);

    if (await this.hasYouAreNotAuthorError(auth, author)) return false;
    if (await this.hasAuthorNotFoundError(auth, author)) return false;

    return true;
  }

  private async hasYouAreNotAuthorError(auth: ExamClientAuthDto, { authorToken }: Author) {
    if (auth.role === 'author' && authorToken !== auth.authorToken) {
      return !this.handleError(
        WSException.Forbidden('You are not the author of this room', {
          disconnect: true,
        }),
      );
    }

    return false;
  }

  private async hasAuthorNotFoundError(auth: ExamClientAuthDto, { clientId }: Author) {
    if (auth.role === 'student' && !clientId) {
      return !this.handleError(
        WSException.Forbidden('Author not found. Author have to join first', {
          disconnect: true,
        }),
      );
    }

    return false;
  }

  private async hasRoomNotFoundError({ examCode }: ExamClientAuthDto) {
    const roomExist = await this.examsService.examExists(examCode);

    if (roomExist) return false;

    return !this.handleError(
      WSException.NotFound('Exam not found. Please, check the exam code', {
        disconnect: true,
      }),
    );
  }

  private async handleValidationError(
    dto: new () => ClientAuthorAuthDto | ClientStudentAuthDto,
    auth: unknown,
  ) {
    const errors = await validate(plainToClass(dto, auth));

    if (errors.length > 0) {
      return this.handleError(
        WSException.BadRequest(
          errors.map((error) => Object.values(error.constraints ?? {})).flat(),
          { disconnect: true },
        ),
      );
    }
  }

  private async validateAuthDto(): Promise<ExamClientAuthDto | null> {
    const auth = this.client.handshake.auth;

    switch (auth.role) {
      case 'author':
        this.handleValidationError(ClientAuthorAuthDto, auth);

        return auth as ClientAuthorAuthDto;
      case 'student':
        this.handleValidationError(ClientStudentAuthDto, auth);

        return auth as ClientStudentAuthDto;
      default:
        this.handleError(
          WSException.BadRequest('Role must be either "author" or "student"', {
            disconnect: true,
          }),
        );

        return null;
    }
  }
}
