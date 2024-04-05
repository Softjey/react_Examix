import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateTestDtoAuthorId } from './dtos/create-test.dto';
import { Prisma, Test } from '@prisma/client';
import { GetTestsDto } from './dtos/get-tests.dto';
import { TestQuestionIncludeQuestion } from './interfaces/test-question-include-question.interface';

@Injectable()
export class TestsService {
  constructor(private readonly prismaService: PrismaService) {}

  createDetailedTest(test: Test, testQuestions: TestQuestionIncludeQuestion[]) {
    return {
      ...test,
      questions: testQuestions.map(({ question, maxScore, timeLimit }) => ({
        question,
        maxScore,
        timeLimit,
      })),
    };
  }

  async create({ questions, name, description, subject, authorId }: CreateTestDtoAuthorId) {
    return this.prismaService.$transaction(async (prisma) => {
      const test = await prisma.test.create({
        data: { name, description, authorId, subject },
      });

      const { count } = await prisma.testQuestion.createMany({
        data: questions.map((question) => ({
          ...question,
          testId: test.id,
        })),
      });

      return [test, count] as const;
    });
  }

  async getAll({ limit, page, search, subjects, authorId }: GetTestsDto = {}) {
    const skip = limit && page ? (page - 1) * limit : 0;
    const where: Prisma.TestWhereInput = {};

    if (search) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (subjects && subjects.length > 0) {
      where.AND = {
        OR: [{ subject: { in: subjects } }, { subject: null }],
      };
    }

    return this.prismaService.test.findMany({
      where: { ...where, authorId },
      skip,
      take: limit,
    });
  }

  async getOne(testId: Test['id']) {
    const [test, questions] = await this.getTestAndQuestionsByTestId(testId);

    if (!test) {
      return null;
    }

    return this.createDetailedTest(test, questions);
  }

  async getTestAndQuestionsByTestId(testId: Test['id']) {
    const [test, questions] = await this.prismaService.$transaction([
      this.prismaService.test.findUnique({ where: { id: testId } }),
      this.prismaService.testQuestion.findMany({
        where: { testId },
        include: { question: true },
      }),
    ]);

    return [test, questions as TestQuestionIncludeQuestion[]] as const;
  }
}
