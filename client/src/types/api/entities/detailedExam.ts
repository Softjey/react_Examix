import { DetailedTest } from './detailedTest';
import { Exam } from './exam';

export interface DetailedExam extends Exam {
  test: DetailedTest;
}
