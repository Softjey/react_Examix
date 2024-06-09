import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';
import { QueryKey } from '../../services/Query/types';
import { QuestionsParams } from '../../services/Api/types/questions';

export default function useQuestions(params: QuestionsParams = {}) {
  const { authorId, limit, page, search, subjects, types } = params;
  const { data, ...rest } = useQuery({
    queryKey: [QueryKey.QUESTIONS, authorId, limit, page, search, subjects, types],
    queryFn: () => ApiClient.getQuestions(params),
  });

  return { questions: data, ...rest };
}
