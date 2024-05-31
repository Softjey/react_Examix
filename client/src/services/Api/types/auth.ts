import { User } from '../../../types/api/entities/user';
import { WithMessage } from './utils';

export type AuthResponse = WithMessage<{ user: User }>;
