import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Exam } from '../entities/exam.entity';

@Injectable()
export class ExamsCacheService {
  private readonly redisPrefix = 'exam';

  constructor(@Inject('REDIS_CLIENT') private readonly redisService: Redis) {}

  async setExam(examCode: string, exam: Exam) {
    await this.redisService.hset(this.redisPrefix, examCode, JSON.stringify(exam));
  }

  async getExam(examCode: string) {
    const exam = await this.redisService.hget(this.redisPrefix, examCode);

    if (!exam) {
      throw new BadRequestException(`Exam with code ${examCode} not found`);
    }

    return JSON.parse(exam) as Exam;
  }

  async examExists(examCode: string) {
    const fieldExists = await this.redisService.hexists(this.redisPrefix, examCode);

    return fieldExists === 1;
  }

  async deleteExamFromCache(examCode: string) {
    await this.redisService.hdel(this.redisPrefix, examCode);
  }
}
