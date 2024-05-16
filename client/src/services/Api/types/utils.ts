/* eslint-disable @typescript-eslint/ban-types */

export type WithMessage<T extends Record<string, unknown> = {}> = {
  message: string;
} & T;
