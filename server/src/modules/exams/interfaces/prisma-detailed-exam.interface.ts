import { $Enums, Prisma, Question, User } from '@prisma/client';

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
  authorId: number;
  author: { name: User['name']; photo: User['photo']; createdAt: User['createdAt'] };
  subject: $Enums.Subject | null;
  testQuestions: PrismaDetailedExamQuestion[];
}

export interface PrismaDetailedExamQuestion {
  id: number;
  question: {
    id: Question['id'];
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
