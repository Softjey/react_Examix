import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateTestDtoAuthorId } from './dtos/create-test.dto';
import { Test, TestQuestion } from '@prisma/client';
import { Question } from '../questions/interfaces/question.interface';

@Injectable()
export class TestsService {
  constructor(private readonly prismaService: PrismaService) {}

  normalize(test: Test, testQuestions: TestQuestion[]) {
    return {
      ...test,
      questions: testQuestions.map(({ questionId, maxScore, timeLimit }) => ({
        questionId,
        maxScore,
        timeLimit,
      })),
    };
  }

  async create({ questions, name, description, authorId }: CreateTestDtoAuthorId) {
    return this.prismaService.$transaction(async (prisma) => {
      const test = await prisma.test.create({
        data: { name, description, authorId },
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

  async getTestAndQuestionsByTestId(testId: Test['id']) {
    const [test, questions] = await this.prismaService.$transaction([
      this.prismaService.test.findUnique({ where: { id: testId } }),
      this.prismaService.testQuestion.findMany({
        where: { testId },
        include: { question: true },
      }),
    ]);

    return [test, questions as (TestQuestion & { question: Question })[]] as const;
  }
}
