import { Injectable } from '@nestjs/common';
import { Answer, Question } from './interfaces/question.interface';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.question.findMany() as Promise<Question[]>;
  }

  async create(createQuestionDto: CreateQuestionDto & { authorId: User['id'] }) {
    const newQuestion = await this.prismaService.question.create({
      data: {
        ...createQuestionDto,
        answers: createQuestionDto.answers as Answer[],
      },
    });

    return newQuestion as Question;
  }
}
