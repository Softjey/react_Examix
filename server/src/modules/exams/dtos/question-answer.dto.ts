import { Type } from 'class-transformer';
// eslint-disable-next-line max-len
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, ValidateNested } from 'class-validator'; // prettier-ignore
import { Answer } from 'src/modules/questions/interfaces/question.interface';

export class QuestionAnswerDto {
  @IsUUID()
  studentId: string;

  @IsNumber()
  @IsPositive()
  questionIndex: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentAnswer)
  answers: StudentAnswer[];
}

export class StudentAnswer {
  @IsString()
  @IsNotEmpty()
  title: Answer['title'];
}
