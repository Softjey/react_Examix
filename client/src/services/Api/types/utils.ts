/* eslint-disable @typescript-eslint/ban-types */

export type WithMessage<T extends Record<string, unknown> = {}> = {
  message: string;
} & T;

export type WithPagination<T> = T & {
  pagesAmount: number;
  amount: number;
};
