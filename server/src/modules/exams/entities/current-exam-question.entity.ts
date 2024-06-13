import { ExamQuestion } from './exam-question.entity';

export class CurrentExamQuestion extends ExamQuestion {
  timeExpiresAt: string;
  index: number;

  constructor(question: ExamQuestion, { index }: { index: number }) {
    super(question);
    this.index = index;
    this.timeExpiresAt = new Date(Date.now() + question.timeLimit * 1000).toISOString();
  }
}
