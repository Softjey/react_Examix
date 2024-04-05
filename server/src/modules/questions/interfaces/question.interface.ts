import { Question as PrismaQuestion } from '@prisma/client';

export type Answer = { title: string; isCorrect: boolean };

export interface Question extends PrismaQuestion {
  answers: Answer[];
}
