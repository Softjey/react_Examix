import { RawExamCurrentQuestion } from '../../../types/api/entities/testQuestion';

export default function prepareCurrentQuestion(rawQuestion: RawExamCurrentQuestion | null) {
  if (!rawQuestion) return null;

  const timeExpresAt = new Date(rawQuestion.timeExpresAt);
  const question = { ...rawQuestion, timeExpresAt };

  return question;
}
