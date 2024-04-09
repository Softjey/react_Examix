import {
  PrismaDetailedExam,
  PrismaDetailedExamTest,
  PrismaDetailedExamQuestion,
  PrismaDetailedExamResults,
} from './prisma-detailed-exam.interface';

export interface DetailedExam extends Omit<PrismaDetailedExam, 'results'> {
  test: DetailedExamTest;
}

export interface DetailedExamTest extends PrismaDetailedExamTest {
  testQuestions: DetailedExamQuestion[];
}

export interface DetailedExamQuestion extends PrismaDetailedExamQuestion {
  results: Omit<PrismaDetailedExamResults, 'testQuestionId'>[];
}
