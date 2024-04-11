import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import config from 'src/config';

@Injectable()
export class AuthCacheService {
  resetPasswordPrefix = 'reset-password';
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async setResetPasswordToken(token: string, userId: number) {
    await this.redisClient.set(
      `${this.resetPasswordPrefix}:${token}`,
      userId,
      'EX',
      config.PASSWORD_RESET_EXPIRATION * 60,
    );
  }

  async getResetPasswordToken(token: string) {
    const userId = await this.redisClient.get(`${this.resetPasswordPrefix}:${token}`);

    return userId ? +userId : null;
  }

  async deleteResetPasswordToken(token: string) {
    await this.redisClient.del(`${this.resetPasswordPrefix}:${token}`);
  }
}
