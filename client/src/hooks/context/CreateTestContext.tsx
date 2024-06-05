import { createContext, useMemo } from 'react';
import useCreateQuestions from '../queries/useCreateQuestions';
import useCreateTest from '../queries/useCreateTest';

interface CreateTestContextProps {
  loading: boolean;
  createQuestionsMutation: ReturnType<typeof useCreateQuestions>;
  createTestMutation: ReturnType<typeof useCreateTest>;
}

export const CreateTestContext = createContext<CreateTestContextProps | null>(null);

const CreateTestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const createQuestionsMutation = useCreateQuestions();
  const createTestMutation = useCreateTest();

  const loading = createQuestionsMutation.isPending || createTestMutation.isPending;

  const value = useMemo(
    () => ({ loading, createQuestionsMutation, createTestMutation }),
    [loading, createQuestionsMutation, createTestMutation],
  );

  return <CreateTestContext.Provider value={value}>{children}</CreateTestContext.Provider>;
};

export default CreateTestProvider;
