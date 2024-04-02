import { TestQuestion } from '@prisma/client';
import { Question } from '../../questions/interfaces/question.interface';

export class ExamQuestion {
  id: TestQuestion['id'];
  type: 'single' | 'multiple';
  title: Question['title'];
  answers: Question['answers'];
  maxScore: TestQuestion['maxScore'];
  timeLimit: TestQuestion['timeLimit'];

  constructor({
    id,
    maxScore,
    timeLimit,
    question: { title, answers },
  }: TestQuestion & { question: Question }) {
    const correctLength = answers.filter((answer) => answer.isCorrect).length;

    this.id = id;
    this.title = title;
    this.type = correctLength > 1 ? 'multiple' : 'single';
    this.answers = answers;
    this.maxScore = maxScore;
    this.timeLimit = timeLimit;
  }
}
