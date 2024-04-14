import { Socket } from 'socket.io';
import { ExamQuestion } from './exam-question.entity';
import { StudentAnswer } from '../dtos/question-answer.dto';

type Result = { answers: StudentAnswer[] };

export class Student {
  public results: Record<ExamQuestion['id'], Result> = {};

  constructor(
    public clientId: Socket['id'],
    public name: string,
    public studentToken: string,
  ) {}
}
