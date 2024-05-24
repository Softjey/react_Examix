import { Exam } from '../../../types/api/exam';
import { WithPagination } from './utils';

export type ExamsParams = {
  search?: string;
  testId?: number;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
};

export type ExamsResponse = WithPagination<{ exams: Exam[] }>;
