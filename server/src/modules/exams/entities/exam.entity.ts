import { Test } from '@prisma/client';
import { ExamQuestion } from './exam-question.entity';
import { Student } from './student.entity';

export class Exam {
  public students = new Map<Student['id'], Student>();
  constructor(
    readonly test: Test,
    readonly questions: ExamQuestion[],
  ) {}
}
