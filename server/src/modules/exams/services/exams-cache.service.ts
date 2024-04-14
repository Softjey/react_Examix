import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Exam } from '../entities/exam.entity';

@Injectable()
export class ExamsCacheService {
  private readonly redisPrefix = 'exam';

  constructor(@Inject('REDIS_CLIENT') private readonly redisService: Redis) {}

  async setExam(examCode: string, exam: Exam, expiration?: number) {
    if (!expiration) {
      await this.redisService.set(`${this.redisPrefix}:${examCode}`, JSON.stringify(exam));

      return;
    }

    await this.redisService.set(
      `${this.redisPrefix}:${examCode}`,
      JSON.stringify(exam),
      'EX',
      expiration,
    );
  }

  async getExam(examCode: string) {
    const exam = await this.redisService.get(`${this.redisPrefix}:${examCode}`);

    if (!exam) {
      throw new BadRequestException(`Exam with code ${examCode} not found`);
    }

    return JSON.parse(exam) as Exam;
  }

  async examExists(examCode: string) {
    const fieldExists = await this.redisService.exists(`${this.redisPrefix}:${examCode}`);

    return fieldExists === 1;
  }

  async deleteExamFromCache(examCode: string) {
    await this.redisService.del(`${this.redisPrefix}:${examCode}`);
  }
}
