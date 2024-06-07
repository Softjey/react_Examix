import { DetailedExam } from '../../../types/api/entities/detailedExam';
import { DetailedTest } from '../../../types/api/entities/detailedTest';
import {
  StudentQuestion,
  TempResultsQuestion,
  TestQuestionWithResults,
} from '../../../types/api/entities/testQuestion';
import { StudentTest } from '../ws/types/StudentTest';
import Student, { StudentWithResults } from './Student';

export interface StoresExam {
  students: Student[];
  currentQuestion: StudentQuestion | null;
}

export interface StudentStoresExam extends StoresExam {
  test: StudentTest;
}

export interface AuthorStoresExam extends StoresExam {
  id: null | DetailedExam['id'];
  test: DetailedTest;
  results: TestQuestionWithResults[] | null;
}

export type TempResults = {
  students: StudentWithResults[];
  questions: TempResultsQuestion[];
};
