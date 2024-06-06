import { Result } from './Result';
import { Question, StudentAnswer } from './question';

export interface TestQuestion {
  id: number;
  timeLimit: number;
  maxScore: number;
  question: Question;
}

export interface TestQuestionWithResults extends TestQuestion {
  results: Result[];
}

type TestQuestionInfo = Pick<TestQuestion, 'id' | 'timeLimit' | 'maxScore'>;

export interface StudentQuestion extends Pick<Question, 'title' | 'type'>, TestQuestionInfo {
  answers: StudentAnswer[];
  index: number;
}

export type TempResultsQuestion = Pick<Question, 'title' | 'type' | 'answers'> & TestQuestionInfo;
