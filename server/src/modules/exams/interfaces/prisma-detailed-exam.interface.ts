import { $Enums, Prisma } from '@prisma/client';

export interface PrismaDetailedExam {
  id: number;
  authorId: number;
  createdAt: Date;
  test: PrismaDetailedExamTest;
  results: PrismaDetailedExamResults[];
}

export interface PrismaDetailedExamTest {
  id: number;
  name: string;
  description: string;
  subject: $Enums.Subject | null;
  testQuestions: PrismaDetailedExamQuestion[];
}

export interface PrismaDetailedExamQuestion {
  id: number;
  question: {
    type: string;
    subject: $Enums.Subject | null;
    title: string;
    answers: Prisma.JsonValue;
  };
  timeLimit: number;
  maxScore: number;
}

export interface PrismaDetailedExamResults {
  testQuestionId: number;
  studentName: string;
  studentAnswer: Prisma.JsonValue;
}
