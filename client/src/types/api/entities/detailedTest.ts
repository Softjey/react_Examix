import { Test } from './test';
import { TestQuestion, TestQuestionWithResults } from './testQuestion';
import { User } from './user';

export interface DetailedTest extends Test {
  author: Pick<User, 'name' | 'photo' | 'createdAt'>;
  testQuestions: TestQuestion[];
}

export interface DetailedTestWithResults extends Omit<DetailedTest, 'testQuestions'> {
  testQuestions: TestQuestionWithResults[];
}
