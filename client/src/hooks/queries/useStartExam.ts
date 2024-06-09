import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import authorExamStore from '../../store/ExamStore/AuthorExamStore';

export type UseStartExamOptions = UseMutationOptions<void, Error, void, unknown>;

export default function useStartExam(options?: UseStartExamOptions) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: async () => {
      await authorExamStore.startExam();
    },
    ...options,
  });

  const startExam = () => mutate();

  return { startExam, ...mutation };
}
