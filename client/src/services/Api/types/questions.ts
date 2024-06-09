import { Question } from '../../../types/api/entities/question';
import Subject from '../../../types/api/enums/Subject';
import QuestionType from '../../../types/api/enums/Type';

export type QuestionsParams = {
  authorId?: Question['authorId'];
  limit?: number;
  search?: string;
  page?: number;
  subjects?: Subject[];
  types?: QuestionType[];
};

export type QuestionsRepsonse = Question[];
