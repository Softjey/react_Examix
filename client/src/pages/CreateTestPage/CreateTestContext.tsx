import { createContext, useContext, useMemo } from 'react';
import useCreateQuestions from '../../hooks/queries/useCreateQuestions';
import useCreateTestMutation from '../../hooks/queries/useCreateTest';
import ApiError from '../../services/Api/ApiError';
import { Nullable } from '../../types/utils/Nullable';

interface CreateTestContextProps {
  error: Nullable<ApiError>;
  loading: boolean;
  reset: () => void;
  createQuestionsMutation: ReturnType<typeof useCreateQuestions>;
  createTestMutation: ReturnType<typeof useCreateTestMutation>;
}

const CreateTestContext = createContext<CreateTestContextProps | null>(null);

const CreateTestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const createQuestionsMutation = useCreateQuestions();
  const createTestMutation = useCreateTestMutation();

  const loading = createQuestionsMutation.isPending || createTestMutation.isPending;
  const error = (createQuestionsMutation.error || createTestMutation.error) as ApiError;

  const value = useMemo(() => {
    const reset = () => {
      createQuestionsMutation.reset();
      createTestMutation.reset();
    };

    return { reset, loading, error, createQuestionsMutation, createTestMutation };
  }, [loading, error, createQuestionsMutation, createTestMutation]);

  return <CreateTestContext.Provider value={value}>{children}</CreateTestContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCreateTest = () => {
  const createTestContext = useContext(CreateTestContext);

  if (!createTestContext) {
    throw new Error('CreateTestContext must be used within a CreateTestContext.Provider');
  }

  return createTestContext;
};

export default CreateTestProvider;
