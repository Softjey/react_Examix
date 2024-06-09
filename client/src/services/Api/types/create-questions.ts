import { WithMessage } from './utils';
import { Question } from '../../../types/api/entities/question';
import Subject from '../../../types/api/enums/Subject';

export type CreateQuestionDto = Pick<Question, 'title' | 'type' | 'answers'> & {
  subject?: Subject;
};

export type CreateQuestionsResponse = WithMessage<{ questions: Question[] }>;
