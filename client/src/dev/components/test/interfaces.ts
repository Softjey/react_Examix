import Subject from '../../../types/api/enums/Subject';
import QuestionType from '../../../types/api/enums/Type';

export interface Answer {
  title: string;
  isCorrect: boolean;
}

export interface Question {
  title: string;
  type: QuestionType;
  answers: Answer[];
  maxScore: number;
  timeLimit: number;
}
export interface CreateTestForm {
  testImage: File | null;
  testName: string;
  testDescription: string;
  subject: Subject | null;
  questions: Question[];
}
