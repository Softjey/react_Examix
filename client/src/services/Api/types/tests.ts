import Subject from '../../../types/api/enums/Subject';
import { Test } from '../../../types/api/entities/test';
import { User } from '../../../types/api/entities/user';
import { WithPagination } from './utils';

export type TestsFilters = {
  authorId?: User['id'];
  limit?: number;
  search?: string;
  subjects?: Subject[];
  page?: number;
};

export type TestsResponse = WithPagination<{ tests: Test[] }>;
