import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UniqueIdService {
  generateUUID() {
    return uuid();
  }

  generate6DigitCode(mapOrSet: Map<string, unknown> | Set<string>) {
    let new6digitCode: string;

    do {
      new6digitCode = `${Math.floor(Math.random() * 100_000)}`.padStart(6, '0');
    } while (mapOrSet.has(new6digitCode));

    return new6digitCode;
  }
}
