import { Exam } from '../../../types/api/exam';
import { Question } from '../../../types/api/question';
import { Test } from '../../../types/api/test';
import { WithMessage } from './utils';

export type GlobalSearchResponse = WithMessage<{
  results: GlobalSearchResult[];
}>;

export type GlobalSearchResult =
  | GlobalSearchResultQuestion
  | GlobalSearchResultTest
  | GlobalSearchResultExam;

interface GlobalSearchResultExam {
  type: 'exam';
  item: Exam;
}

interface GlobalSearchResultTest {
  type: 'test';
  item: Test;
}

interface GlobalSearchResultQuestion {
  type: 'question';
  item: Question;
}
