import { Author } from '../authors/author.entity';
import { Exam } from '../exams/entities/exam.entity';

export class Room {
  constructor(
    readonly id: string,
    readonly exam: Exam,
    readonly author: Author,
  ) {}
}
