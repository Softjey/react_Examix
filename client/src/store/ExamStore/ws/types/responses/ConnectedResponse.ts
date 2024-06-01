import { DetailedTest } from '../../../../../types/api/entities/detailedTest';
import { WithMessage } from '../../../../../services/Api/types/utils';
import { StudentTest } from '../StudentTest';

export type AuthorConnectedResponse = WithMessage<{ test: DetailedTest }>;
export type StudentConnectedResponse = WithMessage<{
  test: StudentTest;
  studentId: string;
  studentToken: string;
}>;
