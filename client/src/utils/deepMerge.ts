/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
type TAllKeys<T> = T extends unknown ? keyof T : never;
type TIndexValue<T, K extends PropertyKey, D = never> = T extends unknown
  ? K extends keyof T
    ? T[K]
    : D
  : never;
type TPartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>> extends infer O
  ? { [P in keyof O]: O[P] }
  : never;
type TFunction = (...a: unknown[]) => unknown;
type TPrimitives = string | number | boolean | bigint | symbol | Date | TFunction;
type TMerged<T> = [T] extends [Array<unknown>]
  ? { [K in keyof T]: TMerged<T[K]> }
  : [T] extends [TPrimitives]
    ? T
    : [T] extends [object]
      ? TPartialKeys<{ [K in TAllKeys<T>]: TMerged<TIndexValue<T, K>> }, never>
      : T;

const isObject = (obj: unknown) => {
  if (typeof obj === 'object' && obj !== null) {
    if (typeof Object.getPrototypeOf === 'function') {
      const prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }

    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  return false;
};

interface IObject {
  [key: string]: unknown;
}

const deepMerge = <T extends IObject[]>(...objects: T) => {
  const seenObjects = new WeakMap();

  const merge = (target: IObject, source: IObject) => {
    if (seenObjects.has(source)) {
      return target;
    }

    seenObjects.set(source, true);

    Object.keys(source).forEach((key) => {
      if (['__proto__', 'constructor', 'prototype'].includes(key)) {
        return;
      }

      if (Array.isArray(target[key]) && Array.isArray(source[key])) {
        target[key] = deepMerge.options.mergeArrays
          ? deepMerge.options.uniqueArrayItems
            ? Array.from(new Set([...target[key], ...source[key]]))
            : [...target[key], ...source[key]]
          : source[key];
      } else if (isObject(target[key]) && isObject(source[key])) {
        target[key] = merge(target[key] as IObject, source[key] as IObject);
      } else {
        target[key] =
          source[key] === undefined && !deepMerge.options.allowUndefinedOverrides
            ? target[key]
            : source[key];
      }
    });

    return target;
  };

  return objects.reduce((result, current) => merge(result, current), {}) as TMerged<T[number]>;
};

export default deepMerge;

interface IOptions {
  allowUndefinedOverrides: boolean;
  mergeArrays: boolean;
  uniqueArrayItems: boolean;
}

const defaultOptions: IOptions = {
  allowUndefinedOverrides: true,
  mergeArrays: true,
  uniqueArrayItems: true,
};

deepMerge.options = defaultOptions;

deepMerge.withOptions = <T extends IObject[]>(options: Partial<IOptions>, ...objects: T) => {
  deepMerge.options = {
    ...defaultOptions,
    ...options,
  };

  const result = deepMerge(...objects);

  deepMerge.options = defaultOptions;

  return result;
};
