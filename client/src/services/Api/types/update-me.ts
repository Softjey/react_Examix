import { User } from '../../../types/api/entities/user';
import { WithMessage } from './utils';

export type UpdateMeResponse = WithMessage<{ user: User }>;
export type UpdateMeDto = {
  name?: User['name'];
  photo?: User['photo'];
};
