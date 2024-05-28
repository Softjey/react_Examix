import { useQuery } from '@tanstack/react-query';
import { Exam } from '../../types/api/entities/exam';
import ApiClient from '../../services/Api/ApiClient';
import { Nullable } from '../../types/utils/Nullable';

export default function useExam(id: Nullable<Exam['id']>) {
  const { data, ...rest } = useQuery({
    queryKey: ['exam', id],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      return ApiClient.getExamById(id);
    },
  });

  return { exam: data, ...rest };
}
