import { TestQuestion } from '@prisma/client';
import { Answer, Question } from '../../questions/interfaces/question.interface';
import { Student } from './student.entity';

type Result = { answer: Answer['title'] };

export class ExamQuestion {
  title: Question['title'];
  answers: Question['answers'];
  maxScore: TestQuestion['maxScore'];
  timeLimit: TestQuestion['timeLimit'];
  studentsResults = new Map<Student['id'], Result>();

  constructor({
    maxScore,
    timeLimit,
    question: { title, answers },
  }: TestQuestion & { question: Question }) {
    this.title = title;
    this.answers = answers;
    this.maxScore = maxScore;
    this.timeLimit = timeLimit;
  }
}
