import { WithMessage } from './utils';
import { Test } from '../../../types/api/entities/test';
import { TestQuestion } from '../../../types/api/entities/testQuestion';
import Subject from '../../../types/api/enums/Subject';

export type CreateTestQuestion = Pick<TestQuestion, 'maxScore' | 'timeLimit'> & {
  questionId: TestQuestion['id'];
};

export type CreateTestDto = Pick<Test, 'name' | 'image' | 'description'> & {
  subject?: Subject;
  questions: CreateTestQuestion[];
};

export type CreateTestResponse = WithMessage<{ test: Test & { questionsCount: number } }>;
