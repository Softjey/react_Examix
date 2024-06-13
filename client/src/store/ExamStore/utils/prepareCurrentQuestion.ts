import { RawExamCurrentQuestion } from '../../../types/api/entities/testQuestion';

export default function prepareCurrentQuestion(rawQuestion: RawExamCurrentQuestion | null) {
  if (!rawQuestion) return null;

  const timeExpiresAt = new Date(rawQuestion.timeExpiresAt);
  const question = { ...rawQuestion, timeExpiresAt };

  return question;
}
