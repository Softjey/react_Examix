import { Nullable } from '../../utils/Nullable';
import { StudentAnswer } from './question';

export interface Result {
  studentName: string;
  studentAnswer: Nullable<{ answers: StudentAnswer[] }>;
}
