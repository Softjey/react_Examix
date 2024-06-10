import WsException from './types/WsException';

export default class WsApiError extends Error {
  status: number;

  constructor({ message, status }: WsException) {
    super(message);

    this.status = status;
  }
}
