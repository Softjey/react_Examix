import { Exam } from '../../../types/api/entities/exam';
import { Question } from '../../../types/api/entities/question';
import { Test } from '../../../types/api/entities/test';
import { WithMessage } from './utils';

export type GlobalSearchResponse = WithMessage<{
  results: GlobalSearchResult[];
}>;

export type GlobalSearchResult =
  | GlobalSearchResultQuestion
  | GlobalSearchResultTest
  | GlobalSearchResultExam;

export interface GlobalSearchResultExam {
  type: 'exam';
  item: Exam;
}

export interface GlobalSearchResultTest {
  type: 'test';
  item: Test;
}

export interface GlobalSearchResultQuestion {
  type: 'question';
  item: Question;
}
