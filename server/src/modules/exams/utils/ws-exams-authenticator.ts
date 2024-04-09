import { Socket } from 'socket.io';
import { WsExceptionsFilter } from 'src/utils/websockets/exceptions/ws-exceptions.filter';
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';
import { ClientAuthorAuthDto, ClientStudentAuthDto } from '../dtos/client-auth.dto';
import { ExamClientAuthDto } from '../dtos/client-auth.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ExamManagementService } from '../services/exams-management.service';
import { Author } from '../entities/author.entity';

export class WsExamsAuthenticator {
  constructor(
    private readonly examsService: ExamManagementService,
    private readonly client: Socket,
  ) {}

  async authenticate() {
    await this.validateAuthDto();
    const isAuthorized = await this.handleErrors();

    return { isAuthorized, auth: this.client.handshake.auth as ExamClientAuthDto };
  }

  private handleError(error: WebSocketException) {
    WsExceptionsFilter.handleError(this.client, error);

    return false;
  }

  private async handleErrors() {
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
        WebSocketException.Forbidden('You are not the author of this room', {
          disconnect: true,
        }),
      );
    }

    return false;
  }

  private async hasAuthorNotFoundError(auth: ExamClientAuthDto, { clientId }: Author) {
    if (auth.role === 'student' && !clientId) {
      return !this.handleError(
        WebSocketException.Forbidden('Author not found. Author have to join first', {
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
      WebSocketException.NotFound('Room not found. Please, check the room id', {
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
        WebSocketException.BadRequest(
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
          WebSocketException.BadRequest('Role must be either "author" or "student"', {
            disconnect: true,
          }),
        );

        return null;
    }
  }
}
