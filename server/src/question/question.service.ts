import { Injectable } from '@nestjs/common';
import { Question } from './interfaces/question.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dtos/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.question.findMany() as Promise<Question[]>;
  }

  async create(createQuestionDto: CreateQuestionDto) {
    const newQuestion = await this.prismaService.question.create({
      data: createQuestionDto,
    });

    return newQuestion as Question;
  }
}
