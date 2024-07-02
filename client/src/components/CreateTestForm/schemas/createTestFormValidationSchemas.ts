import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';
import Subject from '../../../types/api/enums/Subject';
import QuestionType from '../../../types/api/enums/Type';
import { Answer } from '../../../types/api/entities/question';

const AnswerSchema = z.object({
  title: z.string().min(1, 'Answer title is required'),
  isCorrect: z.boolean(),
});

const isAnswersUnique = (answers: Answer[]) => {
  const titlesSet = new Set<string>();

  return !answers.some((answer) => {
    if (titlesSet.has(answer.title)) {
      return true;
    }
    titlesSet.add(answer.title);
    return false;
  });
};

const QuestionSchema = z.object({
  title: z.string().min(1, 'Question title is required'),
  isFromServer: z.literal(false),
  type: z.enum([QuestionType.SINGLE_CHOICE, QuestionType.MULTIPLE_CHOICE]),
  answers: z
    .array(AnswerSchema)
    .min(2, 'At least two answers are required')
    .max(6, 'Max 6 answers')
    .refine((answers) => answers.some((answer) => answer.isCorrect), {
      message: 'At least one answer must be correct',
    })
    .refine((answers) => isAnswersUnique(answers), {
      message: 'Answers must be unique',
    }),
  maxScore: z.number({ message: 'Max score must be a number' }).min(0, 'Max score is required'),
  timeLimit: z
    .instanceof(dayjs as unknown as typeof Dayjs)
    .refine((value) => value.hour() * 60 * 60 + value.minute() * 60 + value.second() >= 10, {
      message: 'Time limit must be at least 10 seconds',
    })
    .refine((value) => value.hour() * 60 * 60 + value.minute() * 60 + value.second() <= 60 * 60, {
      message: 'Time limit cannot be more than 1 hour',
    }),
});

const ServerQuestionSchema = QuestionSchema.extend({
  id: z.number().positive(),
  createdAt: z.string(),
  authorId: z.number().nullable(),
  subject: z.union([z.nativeEnum(Subject), z.string().length(0)]).nullable(),
  isFromServer: z.literal(true),
});

export const CreateTestSchema = z.object({
  testImageLink: z.string().nullable(),
  testName: z.string().min(1, 'Test name is required'),
  testDescription: z.string().min(1, 'Test description is required'),
  subject: z.union([z.nativeEnum(Subject), z.string().length(0)]),
  questions: z
    .array(z.union([ServerQuestionSchema, QuestionSchema]))
    .min(1, 'At least one question is required'),
});

export type FormQuestion = z.infer<typeof QuestionSchema>;

export type QuestionFromServer = z.infer<typeof ServerQuestionSchema>;

export type CreateTestFormType = z.infer<typeof CreateTestSchema>;
