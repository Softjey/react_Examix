import { WithMessage } from './utils';
import { Question } from '../../../types/api/entities/question';

export type CreateQuestionDto = Pick<Question, 'title' | 'type' | 'subject' | 'answers'>;

export type CreateQuestionsResponse = WithMessage<{ questions: Question[] }>;
