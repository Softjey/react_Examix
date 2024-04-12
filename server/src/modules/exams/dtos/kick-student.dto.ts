import { IsUUID } from 'class-validator';

export class KickStudentDto {
  @IsUUID()
  studentId: string;
}
