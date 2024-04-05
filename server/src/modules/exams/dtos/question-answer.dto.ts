import { Type } from 'class-transformer';
// eslint-disable-next-line max-len
import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, Min, ValidateNested } from 'class-validator'; // prettier-ignore
import { Answer } from 'src/modules/questions/interfaces/question.interface';

export class QuestionAnswerDto {
  @IsUUID()
  studentId: string;

  @IsNumber()
  @Min(0)
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
