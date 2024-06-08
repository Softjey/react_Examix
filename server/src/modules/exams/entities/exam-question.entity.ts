import { TestQuestion } from '@prisma/client';
import { Question } from '../../questions/interfaces/question.interface';

type CreateExamQuestionDto = TestQuestion & { question: Question };

export class ExamQuestion {
  id: TestQuestion['id'];
  type: Question['type'];
  title: Question['title'];
  answers: Question['answers'];
  maxScore: TestQuestion['maxScore'];
  timeLimit: TestQuestion['timeLimit'];

  constructor(question: ExamQuestion);
  constructor(dto: CreateExamQuestionDto);
  constructor(data: CreateExamQuestionDto | ExamQuestion) {
    const { id, maxScore, timeLimit, title, type, answers } = ExamQuestion.getInitFields(data);

    this.id = id;
    this.title = title;
    this.type = type;
    this.answers = answers;
    this.maxScore = maxScore;
    this.timeLimit = timeLimit;
  }

  private static isExamQuestion(data: CreateExamQuestionDto | ExamQuestion): data is ExamQuestion {
    return 'type' in data;
  }

  private static getInitFields(data: CreateExamQuestionDto | ExamQuestion) {
    if (ExamQuestion.isExamQuestion(data)) {
      return data;
    }

    const { id, maxScore, timeLimit, question } = data;
    const { title, answers, type } = question;

    return { id, maxScore, timeLimit, title, type, answers };
  }
}
