import { AxiosError } from 'axios';
import { IApiError } from './types/api-error';

export default class ApiError extends Error {
  readonly name = 'ApiError';
  readonly message: string;
  readonly messages?: string[];
  readonly status?: number;
  readonly axiosError?: AxiosError<IApiError>;

  constructor(error: Error | string) {
    super();

    if (error instanceof AxiosError) {
      const response = error.response as NonNullable<AxiosError<IApiError>['response']>;
      this.axiosError = error;

      if (error.response) {
        this.status = response.status;
        this.message =
          typeof response.data.message === 'string'
            ? response.data.message
            : response.data.message[0] ?? error.message;

        if (Array.isArray(response.data.message)) {
          this.messages = response.data.message;
        }
      } else {
        this.message = error.message;
        this.status = 500;
      }
    } else if (typeof error === 'string') {
      this.message = error;
    } else {
      this.message = error.message;
    }
  }
}
