import Subject from './Subject';

export interface Test {
  id: number;
  name: string;
  image?: string;
  description: string;
  subject?: Subject;
  authorId: number;
  createdAt: string;
}
