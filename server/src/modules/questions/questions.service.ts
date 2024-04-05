import { Injectable } from '@nestjs/common';
import { Answer, Question } from './interfaces/question.interface';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { GetQuestionDto } from './dtos/get-questions-dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOne(id: Question['id']) {
    const question = this.prismaService.question.findUnique({ where: { id } });

    return question;
  }

  getAll({ authorId, search, subjects, limit, page }: GetQuestionDto = {}) {
    const skip = limit && page ? (page - 1) * limit : 0;
    const where: Prisma.QuestionWhereInput = {};

    if (subjects && subjects.length > 0) {
      where.OR = [{ subject: { in: subjects } }, { subject: null }];
    }

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    return this.prismaService.question.findMany({
      skip,
      take: limit,
      where: { ...where, authorId },
    }) as Promise<Question[]>;
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
