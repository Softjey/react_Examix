import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';
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
  maxScore: z.number({ message: 'Max score must be a number' }).min(0, 'Max score is required'),
  timeLimit: z
    .instanceof(dayjs as unknown as typeof Dayjs)
    .refine((value) => value.minute() * 60 + value.second() > 0, {
      message: 'Time limit must be greater than 0',
    })
    .refine((value) => value.minute() * 60 + value.second() <= 10 * 60, {
      message: 'Time limit cannot be more than 10 minutes',
    }),
});

export const CreateTestSchema = z.object({
  testImageLink: z.string().nullable(),
  // .url('Test image link must be a valid URL')
  testName: z.string().min(1, 'Test name is required'),
  testDescription: z.string().min(1, 'Test description is required'),
  subject: z.union([z.nativeEnum(Subject), z.string().length(0)]),
  questions: z.array(QuestionSchema).min(1, 'At least one question is required'),
});

export type CreateTestForm = z.infer<typeof CreateTestSchema>;
