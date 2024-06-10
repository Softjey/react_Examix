import { DetailedExam } from '../../../types/api/entities/detailedExam';
import { DetailedTest } from '../../../types/api/entities/detailedTest';
import { ExamCurrentQuestion } from '../../../types/api/entities/testQuestion';
import { TempResultsQuestion } from '../../../types/api/entities/testQuestion';
import { TestQuestionWithResults } from '../../../types/api/entities/testQuestion';
import Student, { StudentWithResults } from './Student';
import { StudentTest } from './StudentTest';

export interface StoresExam {
  students: Student[];
}

export interface StudentStoresExam extends StoresExam {
  test: StudentTest;
  currentQuestion: ExamCurrentQuestion | null;
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
