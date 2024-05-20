import { Exam } from '../../../types/api/exam';

export type ExamsFilters = {
  search?: string;
  testId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
};

export type ExamsResponse = Exam[];
