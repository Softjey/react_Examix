import { DetailedTest } from '../../../../../types/api/entities/detailedTest';
import { WithMessage } from '../../../../../services/Api/types/utils';
import { StudentTest } from '../StudentTest';
import Student from '../../../types/Student';

export type AuthorConnectedResponse = WithMessage<{
  test: DetailedTest;
  students: Student[];
}>;
export type StudentConnectedResponse = WithMessage<{
  test: StudentTest;
  students: Student[];
  studentId: string;
  studentToken: string;
}>;
