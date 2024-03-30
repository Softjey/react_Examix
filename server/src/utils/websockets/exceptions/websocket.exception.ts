import { HttpStatus } from '@nestjs/common';

interface WebSocketExceptionDetails {
  disconnect?: boolean;
  date?: Date;
  cause?: Error;
}

export class WebSocketException extends Error {
  public readonly details: WebSocketExceptionDetails;

  constructor(
    public readonly message: string,
    public readonly status: number,
    details: WebSocketExceptionDetails = {},
  ) {
    const defaultOptions: WebSocketExceptionDetails = {
      disconnect: false,
    };

    super(message);

    this.details = { ...defaultOptions, ...details };
  }

  public static Forbidden(message?: string, details?: WebSocketExceptionDetails) {
    return new WebSocketException(message ?? 'Forbidden', HttpStatus.FORBIDDEN, details);
  }

  public static NotFound(message?: string, details?: WebSocketExceptionDetails) {
    return new WebSocketException(message ?? 'Not Found', HttpStatus.NOT_FOUND, details);
  }

  public static ServerError(message?: string, details?: WebSocketExceptionDetails) {
    return new WebSocketException(
      message ?? 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      { date: new Date(), ...details },
    );
  }
}
