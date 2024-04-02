import { Author } from '../authors/author.entity';
import { ExamEmitter } from '../exams/utils/exam.emitter';

export class Room {
  constructor(
    readonly id: string,
    readonly examEmitter: ExamEmitter,
    readonly author: Author,
  ) {}
}
