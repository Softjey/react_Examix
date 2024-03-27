import { Question } from '../interfaces/question.interface';

export class CreateQuestionDto
  implements
    Pick<Question, 'title' | 'answers'>,
    Partial<Pick<Question, 'authorId'>>
{
  title: string;
  authorId?: number;
  answers: { title: string; isCorrect: boolean }[];
}
