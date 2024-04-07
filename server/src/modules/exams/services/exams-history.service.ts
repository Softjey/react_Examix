import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Exam } from '../entities/exam.entity';
import { GetExamsResultsDto } from '../dtos/get-exams-results.dto';
import { Prisma, Exam as ExamPrismaModel } from '@prisma/client';
import { TempResults } from '../interfaces/temp-results.interface';

@Injectable()
export class ExamsHistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(options: GetExamsResultsDto = {}) {
    const { search, authorId, testId, page, limit } = options;
    const where: Prisma.ExamWhereInput = {};
    const skip = limit && page ? (page - 1) * limit : 0;

    if (search) {
      where.OR = [
        { results: { some: { studentName: { contains: search } } } },
        { test: { name: { contains: search } } },
      ];
    }

    return this.prismaService.exam.findMany({
      where: {
        authorId,
        testId,
        createdAt: { lte: options.dateTo, gte: options.dateFrom },
        ...where,
      },
      select: {
        id: true,
        authorId: true,
        createdAt: true,
        test: { select: { id: true, name: true, description: true, subject: true } },
      },
      skip,
      take: limit,
    });
  }

  async getById(id: ExamPrismaModel['id']) {
    const detailedExam = await this.prismaService.exam.findUnique({
      where: { id },
      include: {
        test: {
          select: {
            id: true,
            name: true,
            description: true,
            subject: true,
            testQuestions: {
              select: {
                id: true,
                question: {
                  select: {
                    id: true,
                    type: true,
                    subject: true,
                    title: true,
                    answers: true,
                  },
                },
                timeLimit: true,
                maxScore: true,
                results: {
                  select: {
                    studentName: true,
                    studentAnswer: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return detailedExam;
  }

  async saveExam({ author, students, test, questions }: Exam) {
    const questionIds = questions.map(({ id }) => id);
    const studentsArray = Object.values(students);
    const results = studentsArray.reduce((result, { name, results }) => {
      return result.concat(
        questionIds.map((questionId) => ({
          studentName: name,
          testQuestionId: questionId,
          studentAnswer: results[questionId] ? results[questionId] : null,
        })),
      );
    }, []);

    await this.prismaService.exam.create({
      data: {
        authorId: author.userId,
        testId: test.id,
        results: { createMany: { data: results } },
      },
    });
  }

  async parseResults(exam: Exam): Promise<TempResults> {
    return {
      students: Object.values(exam.students),
      questions: exam.questions.slice(0, exam.currentQuestionIndex + 1),
    };
  }
}
