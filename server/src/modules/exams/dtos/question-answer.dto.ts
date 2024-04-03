import { IsArray, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class QuestionAnswerDto {
  @IsUUID()
  studentId: string;

  @IsNumber()
  @IsPositive()
  questionIndex: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  answers: string[];
}
