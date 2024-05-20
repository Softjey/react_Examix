import Subject from '../../../types/api/Subject';
import { Test } from '../../../types/api/test';
import { User } from '../../../types/api/user';

export type TestsFilters = {
  authorId?: User['id'];
  limit?: number;
  search?: string;
  subjects?: Subject[];
  page?: number;
};

export type TestsResponse = Test[];
