import { Socket } from 'socket.io';
import { RoomsService } from '../rooms.service';
import { WsExceptionsFilter } from 'src/utils/websockets/exceptions/ws-exceptions.filter';
import { WebSocketException } from 'src/utils/websockets/exceptions/websocket.exception';

export class WsRoomsAuthenticator {
  static authenticate(roomsService: RoomsService, client: Socket) {
    const query = client.handshake.query;
    const roomId = Array.isArray(query.roomId) ? query.roomId[0] : query.roomId;
    const authorToken = Array.isArray(query.authorToken) ? query.authorToken[0] : query.authorToken;

    if (!roomId || !roomsService.roomExist(roomId)) {
      WsExceptionsFilter.handleError(
        client,
        WebSocketException.NotFound('Room not found. Please, check the room id'),
      );

      return false;
    }

    if (authorToken && roomsService.isAuthorOfRoom(authorToken, roomId)) {
      client.data.authorToken = authorToken;
    }

    client.data.roomId = roomId;

    return true;
  }
}
