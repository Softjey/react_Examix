import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { WebSocketException } from './websocket.exception';
import { WebSocketExceptionResponse } from './websocket-exception.response';
import { Socket } from 'socket.io';

type Exception = WebSocketException | Error | BadRequestException;

@Catch(WebSocketException, Error, BadRequestException)
export class WsExceptionsFilter extends BaseWsExceptionFilter {
  private static readonly eventName = 'exception';

  catch(exception: Exception, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    if (exception instanceof BadRequestException) {
      const response = exception.getResponse() as { message: string };
      const badRequest = WebSocketException.BadRequest(response.message, {
        cause: exception,
      });

      client.emit(WsExceptionsFilter.eventName, new WebSocketExceptionResponse(badRequest));

      return;
    }

    if (exception instanceof WebSocketException) {
      const clientToHandle = exception.details.client ?? client;

      WsExceptionsFilter.handleError(clientToHandle, exception);

      return;
    }

    const serverError = WebSocketException.ServerError('Internal server error', {
      cause: exception,
    });

    console.log(exception);
    client.emit(WsExceptionsFilter.eventName, new WebSocketExceptionResponse(serverError));

    return;
  }

  public static handleError(client: Socket, exception: WebSocketException) {
    client.emit(WsExceptionsFilter.eventName, new WebSocketExceptionResponse(exception));

    if (exception.details.disconnect) {
      client.disconnect();
    }
  }
}
