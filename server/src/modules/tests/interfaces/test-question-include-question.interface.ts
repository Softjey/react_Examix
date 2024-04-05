import { TestQuestion } from '@prisma/client';
import { Question } from 'src/modules/questions/interfaces/question.interface';

export interface TestQuestionIncludeQuestion extends TestQuestion {
  question: Question;
}
