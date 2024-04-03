import { Socket } from 'socket.io';
import { ExamQuestion } from './exam-question.entity';

type Result = { answers: string[] };

export class Student {
  public results: Record<ExamQuestion['id'], Result> = {};

  constructor(
    public clientId: Socket['id'],
    public name: string,
  ) {}
}
