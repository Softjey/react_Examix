import { DetailedTest } from '../../../../types/api/entities/detailedTest';

export type StudentTest = Omit<DetailedTest, 'testQuestions'> & { questionsAmount: number };
