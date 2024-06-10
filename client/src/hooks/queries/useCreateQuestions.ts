import { useMutation } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';
import { CreateQuestionDto } from '../../services/Api/types/create-questions';

export default function useCreateQuestions() {
  const { mutate, ...rest } = useMutation({
    mutationFn: (questions: CreateQuestionDto[]) => ApiClient.createQuestions(questions),
  });

  return { createQuestions: mutate, ...rest };
}
