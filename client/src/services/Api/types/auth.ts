import { User } from '../../../types/api/user';
import { WithMessage } from './utils';

export type AuthResponse = WithMessage<{ user: User }>;
