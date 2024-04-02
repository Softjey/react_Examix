import { Test } from '@prisma/client';
import { ExamQuestion } from './exam-question.entity';
import { Student } from './student.entity';

export class Exam {
  public students: Record<Student['id'], Student> = {};

  constructor(
    readonly test: Test,
    readonly questions: ExamQuestion[],
  ) {}
}
