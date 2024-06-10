import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { WebSocketException } from './websocket.exception';
import { WebSocketExceptionResponse } from './websocket-exception.response';
import { Socket } from 'socket.io';

type Exception = BadRequestException | WebSocketException | Error;

@Catch(BadRequestException, WebSocketException, Error)
export class WsExceptionsFilter extends BaseWsExceptionFilter {
  private static readonly eventName = 'exception';

  catch(exception: Exception, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const isWsServerException = exception instanceof WebSocketException && exception.status >= 500;

    if (exception instanceof BadRequestException) {
      client.emit(WsExceptionsFilter.eventName, new WebSocketExceptionResponse(exception));

      return;
    }

    if (exception instanceof Error || isWsServerException) {
      const wsServerException = WebSocketException.ServerError();

      console.error(exception);
      client.emit(WsExceptionsFilter.eventName, new WebSocketExceptionResponse(wsServerException));

      return;
    }

    if (exception instanceof WebSocketException) {
      const clientToHandle = exception.details.client ?? client;

      WsExceptionsFilter.handleError(clientToHandle, exception);
    }
  }

  static handleError(client: Socket, exception: WebSocketException) {
    client.emit(WsExceptionsFilter.eventName, new WebSocketExceptionResponse(exception));

    if (exception.details?.disconnect) {
      client.disconnect();
    }
  }
}
