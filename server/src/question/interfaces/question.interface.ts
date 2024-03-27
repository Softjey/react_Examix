import { Question as PrismaQuestion } from '@prisma/client';

export interface Question extends PrismaQuestion {
  answers: Array<{ title: string; isCorrect: boolean }>;
}
