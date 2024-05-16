import Subject from '../../../types/api/Subject';
import { Question } from '../../../types/api/question';
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
  item: {
    id: number;
    authorId: number;
    createdAt: string;
    test: {
      id: number;
      name: string;
      description: string;
      subject: Subject;
    };
    results: { studentName: string }[];
  };
}

interface GlobalSearchResultTest {
  type: 'test';
  item: {
    id: number;
    name: string;
    description: string;
    subject?: Subject;
    authorId: number;
    createdAt: string;
  };
}

interface GlobalSearchResultQuestion {
  type: 'question';
  item: Question;
}
