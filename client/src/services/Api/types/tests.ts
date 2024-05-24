import Subject from '../../../types/api/Subject';
import { Test } from '../../../types/api/test';
import { User } from '../../../types/api/user';
import { WithPagination } from './utils';

export type TestsFilters = {
  authorId?: User['id'];
  limit?: number;
  search?: string;
  subjects?: Subject[];
  page?: number;
};

export type TestsResponse = WithPagination<{ tests: Test[] }>;
