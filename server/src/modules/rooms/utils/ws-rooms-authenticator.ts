import { Socket } from 'socket.io';
import { RoomsService } from '../rooms.service';
import { WsExceptionsFilter } from 'src/utils/websockets/exceptions/ws-exceptions.filter';
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';
import { ClientAuthDto, ClientAuthorAuthDto, ClientStudentAuthDto } from '../dtos/client-auth.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationError } from '@nestjs/common';

export class WsRoomsAuthenticator {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly client: Socket,
  ) {}

  async authenticate() {
    const { roomsService } = this;
    const [errors, auth] = await this.validateAuthDto();

    if (auth === null) return false;
    if (errors.length > 0) {
      return this.handleError(
        WebSocketException.BadRequest(
          errors.map((error) => Object.values(error.constraints)).flat(),
          { disconnect: true },
        ),
      );
    }

    if (!roomsService.roomExist(auth.roomId)) {
      return this.handleError(
        WebSocketException.NotFound('Room not found. Please, check the room id', {
          disconnect: true,
        }),
      );
    }

    if (auth.role === 'author' && !roomsService.isAuthorOfRoom(auth.authorToken, auth.roomId)) {
      return this.handleError(
        WebSocketException.Forbidden('You are not the author of this room', {
          disconnect: true,
        }),
      );
    }

    const authorClientId = await roomsService.getRoomAuthorClientId(auth.roomId);
    const needAuthor = auth.role === 'student' && !authorClientId;

    if (needAuthor) {
      return this.handleError(
        WebSocketException.Forbidden('Author not found. Author have to join first', {
          disconnect: true,
        }),
      );
    }

    return true;
  }

  private handleError(error: WebSocketException) {
    WsExceptionsFilter.handleError(this.client, error);

    return false;
  }

  private async validateAuthDto(): Promise<[ValidationError[], ClientAuthDto]> {
    const auth = this.client.handshake.auth;

    switch (auth.role) {
      case 'author':
        return [
          await validate(plainToClass(ClientAuthorAuthDto, auth)),
          auth as ClientAuthorAuthDto,
        ];
      case 'student':
        return [
          await validate(plainToClass(ClientStudentAuthDto, auth)),
          auth as ClientStudentAuthDto,
        ];
      default:
        this.handleError(
          WebSocketException.BadRequest('Role must be either "author" or "student"', {
            disconnect: true,
          }),
        );

        return [null, null];
    }
  }
}
