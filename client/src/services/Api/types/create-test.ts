import { WithMessage } from './utils';
import { Test } from '../../../types/api/entities/test';
import { TestQuestion } from '../../../types/api/entities/testQuestion';

export type CreateTestQuestion = Pick<TestQuestion, 'maxScore' | 'timeLimit'> & {
  questionId: TestQuestion['id'];
};

export type CreateTestDto = Pick<Test, 'name' | 'image' | 'description' | 'subject'> & {
  questions: CreateTestQuestion[];
};

export type CreateTestResponse = WithMessage<{ test: Test & { questionsCount: number } }>;
