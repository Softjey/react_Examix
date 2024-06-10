import { WithMessage } from '../../../../services/Api/types/utils';
import Student from '../Student';
import { RawExamCurrentQuestion } from '../../../../types/api/entities/testQuestion';
import { StudentTest } from '../StudentTest';

export type StudentReconnectedResponse = WithMessage<{
  examStatus: 'created' | 'started' | 'finished';
  currentQuestion: RawExamCurrentQuestion | null;
  test: StudentTest;
  students: Student[];
}>;
