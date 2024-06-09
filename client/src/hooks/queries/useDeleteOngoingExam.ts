import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import authorExamStore from '../../store/ExamStore/AuthorExamStore';

export type UseDeleteOngoingExamOptions = UseMutationOptions<void, Error, void, unknown>;

export default function useDeleteOngoingExam(options?: UseDeleteOngoingExamOptions) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: () => {
      return authorExamStore.deleteExam();
    },
    ...options,
  });

  const deleteExam = () => mutate();

  return { deleteExam, ...mutation };
}
