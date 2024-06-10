import { useMutation } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';
import { CreateTestDto } from '../../services/Api/types/create-test';

export default function useCreateTest() {
  const { mutate, ...rest } = useMutation({
    mutationFn: (testData: CreateTestDto) => ApiClient.createTest(testData),
  });

  return { createTest: mutate, ...rest };
}
