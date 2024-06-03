import { z } from 'zod';
import Subject from '../types/api/enums/Subject';
import QuestionType from '../types/api/enums/Type';

export const isValidImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

const AnswerSchema = z.object({
  title: z.string().min(1, 'Answer title is required'),
  isCorrect: z.boolean(),
});

const QuestionSchema = z.object({
  title: z.string().min(1, 'Question title is required'),
  type: z.enum([
    QuestionType.SINGLE_CHOICE,
    QuestionType.MULTIPLE_CHOICE,
    // QuestionType.TRUE_FALSE,
    // QuestionType.SHORT_ANSWER,
  ]),
  answers: z
    .array(AnswerSchema)
    .min(2, 'At least two answers are required')
    .max(6, 'Max 6 answers')
    .refine((answers) => answers.some((answer) => answer.isCorrect), {
      message: 'At least one answer must be correct',
    }),
  maxScore: z.number().min(0),
  timeLimit: z.number().min(0),
});

export const CreateTestSchema = z.object({
  testImageLink: z.string().nullable(),
  /* .url('Test image link must be a valid URL') */
  /* .refine(
      async (url) => {
        if (!url) return true;
        const isValid = await isValidImageUrl(url);
        return isValid;
      },
      {
        message: 'Test image link must be a valid and accessible image URL',
      },
    ), */
  testName: z.string().min(1, 'Test name is required'),
  testDescription: z.string().min(1, 'Test description is required'),
  subject: z.union([z.nativeEnum(Subject), z.string().length(0)]),
  questions: z.array(QuestionSchema).min(1, 'At least one question is required'),
});

export type CreateTestForm = z.infer<typeof CreateTestSchema>;
