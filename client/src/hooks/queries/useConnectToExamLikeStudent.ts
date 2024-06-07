import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import studentExamStore from '../../store/ExamStore/StudentExamStore';
import { StudentAuth } from '../../store/ExamStore/types/auth';

export type CodeAndName = Pick<StudentAuth, 'examCode' | 'studentName'>;
export type UseConnectToExamOptions = UseMutationOptions<void, Error, CodeAndName, unknown>;

export default function useConnectToExamLikeStudent(options?: UseConnectToExamOptions) {
  const { mutate: connectToExam, ...mutation } = useMutation({
    mutationFn: async (auth: CodeAndName) => {
      await studentExamStore.connectToExam(auth);
    },
    ...options,
  });

  return { connectToExam, ...mutation };
}
