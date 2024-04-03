import { Test } from '@prisma/client';
import { ExamQuestion } from './exam-question.entity';
import { Student } from './student.entity';
import { Author } from './author.entity';

export class Exam {
  status: 'created' | 'started' | 'finished' = 'created';
  currentQuestionIndex = 0;
  intervalId: NodeJS.Timeout = null;
  students: Record<string, Student> = {};

  constructor(
    readonly author: Author,
    readonly test: Test,
    readonly questions: ExamQuestion[],
  ) {}
}
