import { BadRequestException } from '@nestjs/common';
import { WebSocketException } from './websocket.exception';

export class WebSocketExceptionResponse {
  status: number;
  message: string | string[];

  constructor(status: number, message: string | string[]);
  constructor(wsException: WebSocketException);
  constructor(badRequestException: BadRequestException);
  constructor(
    param1: WebSocketException | BadRequestException | number,
    param2?: string | string[],
  ) {
    if (param1 instanceof WebSocketException) {
      this.status = param1.status;
      this.message = param1.message;
    } else if (param1 instanceof BadRequestException) {
      const response = param1.getResponse() as { message: string[] };

      this.status = 400;
      this.message = response.message;
    } else {
      this.status = param1;
      this.message = param2;
    }
  }
}
