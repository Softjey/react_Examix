import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import { UseMutationOptions, useMutation, useQuery } from '@tanstack/react-query';
import studentExamStore from '../../store/ExamStore/StudentExamStore';
import { StudentAuth } from '../../store/ExamStore/types/auth';
import { QueryKey } from '../../services/Query/types';

export type CodeAndName = Pick<StudentAuth, 'examCode' | 'studentName'>;
export type UseConnectToExamOptions = {
  connect?: UseMutationOptions<void, Error, CodeAndName, unknown>;
  reconnect?: UndefinedInitialDataOptions<boolean, Error, void, [QueryKey.RECONNECT_TO_EXAM]>;
};

export default function useConnectToExamLikeStudent({
  connect,
  reconnect,
}: UseConnectToExamOptions = {}) {
  const { data: needConnect, ...reconnectQuery } = useQuery({
    queryKey: [QueryKey.RECONNECT_TO_EXAM],
    queryFn: () => studentExamStore.tryToReconnect(),
    ...reconnect,
  });
  const { mutate: connectToExam, ...connectMutation } = useMutation({
    mutationFn: async (auth: CodeAndName) => {
      await studentExamStore.connectToExam(auth);
    },
    ...connect,
  });

  return [
    { needConnect, ...reconnectQuery },
    { connectToExam, ...connectMutation },
  ] as const;
}
