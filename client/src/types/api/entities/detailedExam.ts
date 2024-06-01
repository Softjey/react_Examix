import { DetailedTestWithResults } from './detailedTest';
import { Exam } from './exam';

export interface DetailedExam extends Omit<Exam, 'results'> {
  test: DetailedTestWithResults;
}
