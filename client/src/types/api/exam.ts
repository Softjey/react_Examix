import { Test } from './test';

export interface Exam {
  id: number;
  authorId: number;
  createdAt: string;
  test: Pick<Test, 'id' | 'name' | 'image' | 'description' | 'subject'>;
  results: { studentName: string }[];
}
