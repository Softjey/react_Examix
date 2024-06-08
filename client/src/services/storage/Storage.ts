export default class Storage<StorageMap extends Record<string, unknown>> {
  private storage = localStorage;

  write<T extends keyof StorageMap>(key: T, value: StorageMap[T]) {
    this.storage.setItem(key as string, JSON.stringify(value));
  }

  read<T extends keyof StorageMap>(key: T): StorageMap[T] | null {
    const value = this.storage.getItem(key as string);
    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value) as StorageMap[T];
    } catch {
      return null;
    }
  }

  has<T extends keyof StorageMap>(key: T): boolean {
    return this.storage.getItem(key as string) !== null;
  }

  init<T extends keyof StorageMap>(key: T, defaultValue: StorageMap[T]): StorageMap[T] {
    if (!this.has(key)) {
      this.write(key, defaultValue);
      return defaultValue;
    }

    return this.read(key) as StorageMap[T];
  }

  push<T extends keyof StorageMap>(key: T, ...values: StorageMap[T][]) {
    const array = this.init(key, [] as unknown as StorageMap[T]) as StorageMap[T][];
    array.push(...(values as StorageMap[T][]));
    this.write(key, array as unknown as StorageMap[T]);
  }

  remove<T extends keyof StorageMap>(key: T, ...values: StorageMap[T][]) {
    if (!this.has(key)) {
      throw new Error(
        `You can't remove values from an array if it hasn't been initialized. Key: ${key.toString()}`,
      );
    }

    const array = this.read(key) as StorageMap[T][];
    const filteredArray = array.filter((value) => !values.includes(value));
    const removedValuesAmount = array.length - filteredArray.length;

    this.write(key, filteredArray as unknown as StorageMap[T]);

    return removedValuesAmount;
  }
}
