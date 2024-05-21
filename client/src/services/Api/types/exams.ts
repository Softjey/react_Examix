import { Exam } from '../../../types/api/exam';

export type ExamsFilters = {
  search?: string;
  testId?: number;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
};

export type ExamsResponse = Exam[];
