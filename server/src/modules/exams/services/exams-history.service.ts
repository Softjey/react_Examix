import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Exam } from '../entities/exam.entity';
import { GetExamsResultsDto } from '../dtos/get-exams-results.dto';
import { Prisma, Exam as ExamPrismaModel } from '@prisma/client';
import { TempResults } from '../interfaces/temp-results.interface';
import { DetailedExam } from '../interfaces/detailed-exam.interface';
import { PrismaDetailedExam } from '../interfaces/prisma-detailed-exam.interface';
import { DETAILED_EXAM_SELECT } from '../utils/exam.select-options';

@Injectable()
export class ExamsHistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: ExamPrismaModel['id']): Promise<DetailedExam> {
    const exam: PrismaDetailedExam = await this.prismaService.exam.findUnique({
      where: { id },
      select: DETAILED_EXAM_SELECT,
    });

    return this.mapPrismaDetailedExamToDetailedExam(exam);
  }

  async getAll(options: GetExamsResultsDto & { searchTest?: boolean } = {}) {
    const { search, authorId, testId, page, limit, searchTest = true } = options;
    const whereCond: Prisma.ExamWhereInput = {};
    const skip = limit && page ? (page - 1) * limit : 0;
    const createdAt = { lte: options.dateTo, gte: options.dateFrom };
    const test = { select: { id: true, name: true, description: true, subject: true } };
    const results = { select: { studentName: true } };
    const select = { id: true, authorId: true, createdAt: true, test, results };

    if (search) {
      whereCond.OR = [
        { results: { some: { studentName: { contains: search, mode: 'insensitive' } } } },
      ];

      if (searchTest) {
        whereCond.OR.push({ test: { name: { contains: search, mode: 'insensitive' } } });
      }
    }

    const where: Prisma.ExamWhereInput = { authorId, testId, createdAt, ...whereCond };

    return this.prismaService.exam.findMany({ select, skip, take: limit, where });
  }

  async saveExam({ author, students, test, questions }: Exam): Promise<DetailedExam> {
    const resultsData = this.prepareDataToCreateExam({ students, questions });
    const results = { createMany: { data: resultsData } };

    const savedExam: PrismaDetailedExam = await this.prismaService.exam.create({
      data: { authorId: author.userId, testId: test.id, results },
      select: DETAILED_EXAM_SELECT,
    });

    return this.mapPrismaDetailedExamToDetailedExam(savedExam);
  }

  async parseResults(exam: Exam): Promise<TempResults> {
    return {
      students: Object.values(exam.students),
      questions: exam.questions.slice(0, exam.currentQuestionIndex + 1),
    };
  }

  private mapPrismaDetailedExamToDetailedExam(exam: PrismaDetailedExam): DetailedExam {
    const { test, results, ...restExam } = exam;
    const testQuestions = test.testQuestions.map((question) => ({
      ...question,
      results: results
        .filter((result) => result.testQuestionId === question.id)
        .map(({ testQuestionId, ...restResult }) => restResult), // eslint-disable-line @typescript-eslint/no-unused-vars
    }));

    return { ...restExam, test: { ...test, testQuestions } };
  }

  private prepareDataToCreateExam({ students, questions }: Pick<Exam, 'students' | 'questions'>) {
    const questionIds = questions.map(({ id }) => id);
    type Result = Prisma.ResultCreateManyExamInput[];

    return Object.values(students).reduce<Result>((result, { name, results }) => {
      return result.concat(
        questionIds.map((questionId) => ({
          studentName: name,
          testQuestionId: questionId,
          studentAnswer: results[questionId] as any, // Use any because prisma JsonValue type is not compatible with Result type
        })),
      );
    }, []);
  }
}
