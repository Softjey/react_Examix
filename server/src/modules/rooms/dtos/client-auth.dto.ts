import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Room } from '../interfaces/Room';
import { IsLiteral } from '../../../utils/validation/is-literal.decorator';

export type ClientAuthDto = ClientAuthorAuthDto | ClientStudentAuthDto;

export class ClientAuthorAuthDto {
  @IsLiteral('author')
  role: 'author';

  @IsString()
  @IsNotEmpty()
  roomId: Room['id'];

  @IsUUID()
  @IsOptional()
  authorToken?: Room['authorToken'];
}

export class ClientStudentAuthDto {
  @IsLiteral('student')
  role: 'student';

  @IsString()
  @IsNotEmpty()
  roomId: Room['id'];

  @IsString()
  @IsNotEmpty()
  studentName: string;
}
