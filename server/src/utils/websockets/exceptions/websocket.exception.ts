import { HttpStatus } from '@nestjs/common';
import { Socket } from 'socket.io';

type Message = string | string[];

interface WebSocketExceptionDetails {
  disconnect?: boolean;
  payload?: Record<string, unknown>;
  date?: Date;
  cause?: Error;
  client?: Socket;
}

export class WebSocketException {
  public readonly details: WebSocketExceptionDetails;

  constructor(
    public readonly message: Message,
    public readonly status: number,
    details: WebSocketExceptionDetails = {},
  ) {
    const defaultOptions: WebSocketExceptionDetails = {
      disconnect: false,
    };

    this.details = { ...defaultOptions, ...details };
  }

  public static BadRequest(message?: Message, details?: WebSocketExceptionDetails) {
    return new WebSocketException(message ?? 'Bad Request', HttpStatus.BAD_REQUEST, details);
  }

  public static Forbidden(message?: Message, details?: WebSocketExceptionDetails) {
    return new WebSocketException(message ?? 'Forbidden', HttpStatus.FORBIDDEN, details);
  }

  public static NotFound(message?: Message, details?: WebSocketExceptionDetails) {
    return new WebSocketException(message ?? 'Not Found', HttpStatus.NOT_FOUND, details);
  }

  public static ServerError(message?: Message, details?: WebSocketExceptionDetails) {
    return new WebSocketException(
      message ?? 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      { date: new Date(), ...details },
    );
  }

  public static Conflict(message?: Message, details?: WebSocketExceptionDetails) {
    return new WebSocketException(message ?? 'Conflict', HttpStatus.CONFLICT, details);
  }
}
