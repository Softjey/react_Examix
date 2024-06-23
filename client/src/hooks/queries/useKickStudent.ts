import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import authorExamStore from '../../store/ExamStore/AuthorExamStore';

export type UseStartExamOptions = UseMutationOptions<void, Error, string, unknown>;

export default function useKickStudent(options?: UseStartExamOptions) {
  const { mutate: kickStudent, ...mutation } = useMutation({
    mutationFn: async (studentId: string) => {
      await authorExamStore.kickStudent(studentId);
    },
    ...options,
  });

  return { kickStudent, ...mutation };
}
