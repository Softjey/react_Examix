import { IsArray, IsNumber, IsPositive } from 'class-validator';
import { PreparedQuestion } from 'src/modules/exams/utils/exam.emitter';

export class QuestionAnswerDto {
  @IsNumber()
  @IsPositive()
  questionId: PreparedQuestion['id'];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  answerIndexes: number[];
}
