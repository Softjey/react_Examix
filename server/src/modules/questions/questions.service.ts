import { Injectable } from '@nestjs/common';
import { Answer, Question } from './interfaces/question.interface';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, $Enums } from '@prisma/client';
import { GetQuestionDto } from './dtos/get-questions.dto';
import { QuestionTypeException } from './exceptions/question-type.exception';

@Injectable()
export class QuestionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOne(id: Question['id']) {
    const question = this.prismaService.question.findUnique({ where: { id } });

    return question;
  }

  getAll({ authorId, search, subjects, limit, page, types }: GetQuestionDto = {}) {
    const skip = limit && page ? (page - 1) * limit : 0;
    const where: Prisma.QuestionWhereInput = {};

    if (subjects && subjects.length > 0) {
      where.OR = [{ subject: { in: subjects } }, { subject: null }];
    }

    if (types && types.length > 0) {
      where.type = { in: types };
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
    const { type, answers: rawAnswers } = createQuestionDto;
    const answers = this.validateAnswers(type, rawAnswers) as Answer[];

    const newQuestion = await this.prismaService.question.create({
      data: { ...createQuestionDto, answers },
    });

    return newQuestion as Question;
  }

  async createMany(createQuestionDtos: (CreateQuestionDto & { authorId: User['id'] })[]) {
    const questionsData = createQuestionDtos.map(({ type, answers: rawAnswers, ...question }) => {
      const answers = this.validateAnswers(type, rawAnswers) as Answer[];

      return { ...question, type, answers };
    });

    const questions = await this.prismaService.question.createMany({
      data: questionsData,
    });

    return questions.count;
  }

  validateAnswers(type: Question['type'], answers: Question['answers']) {
    const correctAnswersLength = answers.filter((answer) => answer.isCorrect).length;

    switch (type) {
      case $Enums.Type.SINGLE_CHOICE:
        if (answers.length < 2 || correctAnswersLength !== 1) {
          throw QuestionTypeException.singleChoice();
        }
        break;
      case $Enums.Type.MULTIPLE_CHOICE:
        if (answers.length < 2 || correctAnswersLength < 1) {
          throw QuestionTypeException.multipleChoice();
        }
        break;
      case $Enums.Type.TRUE_FALSE:
        if (answers.length !== 2 || correctAnswersLength !== 1) {
          throw QuestionTypeException.trueFalse();
        }
        break;
      case $Enums.Type.SHORT_ANSWER:
        throw QuestionTypeException.willBeImplemented(type);
      default:
        throw new Error('Invalid question type');
    }

    return answers;
  }
}
