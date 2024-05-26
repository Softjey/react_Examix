import { Answer, Question } from './question';

export interface Result {
  studentName: string;
  studentAnswer: { answers: Answer[] };
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
