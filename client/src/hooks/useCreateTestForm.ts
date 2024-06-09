import { useFormContext } from 'react-hook-form';
import { CreateTestFormType } from '../components/CreateTestForm/schemas/createTestFormValidationSchemas';

const useCreateTestForm = () => useFormContext<CreateTestFormType>();

export default useCreateTestForm;
