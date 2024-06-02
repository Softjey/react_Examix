import { z } from 'zod';
import Subject from '../types/api/enums/Subject';
import QuestionType from '../types/api/enums/Type';

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
  testImage: z.instanceof(File).nullable(),
  testName: z.string().min(1, 'Test name is required'),
  testDescription: z.string().min(1, 'Test description is required'),
  subject: z.union([z.nativeEnum(Subject), z.string().length(0)]),
  questions: z.array(QuestionSchema).min(1, 'At least one question is required'),
});

export type CreateTestForm = z.infer<typeof CreateTestSchema>;
