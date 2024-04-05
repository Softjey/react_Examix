import { TestQuestion } from '@prisma/client';
import { Question } from '../../questions/interfaces/question.interface';

export class ExamQuestion {
  id: TestQuestion['id'];
  type: Question['type'];
  title: Question['title'];
  answers: Question['answers'];
  maxScore: TestQuestion['maxScore'];
  timeLimit: TestQuestion['timeLimit'];

  constructor({
    id,
    maxScore,
    timeLimit,
    question: { title, answers, type },
  }: TestQuestion & { question: Question }) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.answers = answers;
    this.maxScore = maxScore;
    this.timeLimit = timeLimit;
  }
}
