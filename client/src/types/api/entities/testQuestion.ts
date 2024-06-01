import { Nullable } from '../../utils/Nullable';
import { Answer, Question } from './question';

export interface Result {
  studentName: string;
  studentAnswer: Nullable<{ answers: Pick<Answer, 'title'>[] }>;
}

export interface TestQuestion {
  id: number;
  timeLimit: number;
  maxScore: number;
  question: Question;
}

export interface TestQuestionWithResults extends TestQuestion {
  results: Result[];
}
