import { ValidationArguments, ValidationOptions } from 'class-validator';

export type MapFn<T, R> = (item: T) => R;
export type ItemsName = string;
export type AllUniqueOptions<T, R> = {
  mapFn?: MapFn<T, R>;
  itemsName?: ItemsName;
} & ValidationOptions;

export type AllUniqueValidationArguments = {
  constraints: [mapFn: MapFn<unknown, unknown>, itemsName: ItemsName];
} & ValidationArguments;
