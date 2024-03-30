import { WebSocketException } from './websocket.exception';

export class WebSocketExceptionResponse {
  status: number;
  message: string | string[];

  constructor(status: number, message: string | string[]);
  constructor(wsException: WebSocketException);
  constructor(param1: WebSocketException | number, param2?: string | string[]) {
    if (param1 instanceof WebSocketException) {
      this.status = param1.status;
      this.message = param1.message;
    } else {
      this.status = param1;
      this.message = param2;
    }
  }
}
