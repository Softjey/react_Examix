import { Test } from './test';
import { TestQuestionWithResults } from './testQuestion';

export interface DetailedTest extends Test {
  testQuestions: TestQuestionWithResults[];
}
