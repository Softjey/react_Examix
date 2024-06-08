import { WithMessage } from '../../../../../services/Api/types/utils';
import { StudentTest } from '../StudentTest';
import Student from '../../../types/Student';
import { RawExamCurrentQuestion } from '../../../../../types/api/entities/testQuestion';

export type StudentReconnectedResponse = WithMessage<{
  examStatus: 'created' | 'started' | 'finished';
  currentQuestion: RawExamCurrentQuestion | null;
  test: StudentTest;
  students: Student[];
}>;
