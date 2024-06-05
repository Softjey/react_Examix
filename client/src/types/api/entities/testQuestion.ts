import { Nullable } from '../../utils/Nullable';
import { Question, StudentAnswer } from './question';

export interface Result {
  studentName: string;
  studentAnswer: Nullable<{ answers: StudentAnswer[] }>;
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

export interface StudentQuestion
  extends Pick<Question, 'id' | 'title' | 'type'>,
    Pick<TestQuestion, 'maxScore' | 'timeLimit'> {
  answers: StudentAnswer[];
  index: number;
}
