import { Room } from '../interfaces/Room';

export class ClientDataDto {
  roomId: Room['id'];
  authorToken?: Room['authorToken'];
}
