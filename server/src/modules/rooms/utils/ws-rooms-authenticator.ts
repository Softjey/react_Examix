import { Socket } from 'socket.io';
import { RoomsService } from '../rooms.service';
import { WsExceptionsFilter } from 'src/utils/websockets/exceptions/ws-exceptions.filter';
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';
import { ClientAuthorAuthDto, ClientStudentAuthDto } from '../dtos/client-auth.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationError } from '@nestjs/common';

export class WsRoomsAuthenticator {
  static async authenticate(roomsService: RoomsService, client: Socket) {
    const [errors, auth] = await WsRoomsAuthenticator.validateAuthDto(client);

    if (auth === null) return false;
    if (errors.length > 0) {
      const messages = errors.map((error) => Object.values(error.constraints)).flat();
      const error = WebSocketException.BadRequest(messages, { disconnect: true });
      WsExceptionsFilter.handleError(client, error);

      return false;
    }

    if (!roomsService.roomExist(auth.roomId)) {
      const error = WebSocketException.NotFound('Room not found. Please, check the room id', {
        disconnect: true,
      });

      WsExceptionsFilter.handleError(client, error);

      return false;
    }

    if (auth.role === 'author' && !roomsService.isAuthorOfRoom(auth.authorToken, auth.roomId)) {
      const error = WebSocketException.Forbidden('You are not the author of this room', {
        disconnect: true,
      });

      WsExceptionsFilter.handleError(client, error);

      return false;
    }

    return true;
  }

  private static async validateAuthDto(
    client: Socket,
  ): Promise<[ValidationError[], ClientAuthorAuthDto | ClientStudentAuthDto]> {
    const auth = client.handshake.auth;

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
        const error = WebSocketException.BadRequest('Role must be either "author" or "student"', {
          disconnect: true,
        });
        WsExceptionsFilter.handleError(client, error);

        return [null, null];
    }
  }
}
