import { WithMessage } from './utils';

export type CreateExamResponse = WithMessage<{ examCode: string; authorToken: string }>;
