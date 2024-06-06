import { StudentAnswer } from '../../../types/api/entities/question';

export default interface Student {
  name: string;
  studentId: string;
}

export interface StudentWithResults extends Student {
  results: Record<number, { answers: StudentAnswer[] }>;
}
