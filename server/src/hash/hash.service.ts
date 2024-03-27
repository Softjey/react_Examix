import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import config from 'src/config';

@Injectable()
export class HashService {
  private readonly SALT_ROUNDS = config.BCRYPT_SALT_ROUNDS;

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT_ROUNDS);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
