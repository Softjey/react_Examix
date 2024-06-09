// eslint-disable-next-line import/no-cycle
import { AuthorExamStore } from '../AuthorExamStore';
import { StudentExamStore } from '../StudentExamStore';

export type ExamStore = StudentExamStore | AuthorExamStore;
