import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { Test } from '../../types/api/entities/test';
import authorExamStore from '../../store/ExamStore/AuthorExamStore';

export type UseCreateExamOptions = Omit<
  UseMutationOptions<void, Error, number, unknown>,
  'mutationFn'
>;

export default function useCreateExam(options?: UseCreateExamOptions) {
  const { mutate: createExam, ...mutation } = useMutation({
    mutationFn: async (testId: Test['id']) => {
      await authorExamStore.createExam(testId);
    },
    ...options,
  });

  return { createExam, ...mutation };
}
