import { Test } from './test';
import { TestQuestion } from './testQuestion';
import { User } from './user';

export interface DetailedTest extends Test {
  author: Pick<User, 'name' | 'photo' | 'createdAt'>;
  testQuestions: TestQuestion[];
}
