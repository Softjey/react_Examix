import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { WebSocketException } from './websocket.exception';
import { WebSocketExceptionResponse } from './websocket-exception.response';
import { Socket } from 'socket.io';

@Catch(WebSocketException, Error)
export class WsExceptionsFilter extends BaseWsExceptionFilter {
  private static readonly eventName = 'exception';

  catch(exception: WebSocketException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    if (!(exception instanceof WebSocketException)) {
      const serverError = WebSocketException.ServerError('Internal server error', {
        cause: exception,
      });

      console.log(exception);
      client.emit(WsExceptionsFilter.eventName, new WebSocketExceptionResponse(serverError));

      return;
    }

    const clientToHandle = exception.details.client ?? client;

    WsExceptionsFilter.handleError(clientToHandle, exception);
  }

  public static handleError(client: Socket, exception: WebSocketException) {
    client.emit(WsExceptionsFilter.eventName, new WebSocketExceptionResponse(exception));

    if (exception.details.disconnect) {
      client.disconnect();
    }
  }
}
