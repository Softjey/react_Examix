import { DetailedTest } from '../../../../types/api/entities/detailedTest';
import { WithMessage } from '../../../../services/Api/types/utils';
import Student from '../Student';
import { TempResults } from '../StoresExam';
import { StudentTest } from '../StudentTest';

export type AuthorConnectedResponse = WithMessage<{
  test: DetailedTest;
  examStatus: 'created' | 'started' | 'finished';
  results: TempResults;
  students: Student[];
}>;
export type StudentConnectedResponse = WithMessage<{
  test: StudentTest;
  students: Student[];
  studentId: string;
  studentToken: string;
}>;
