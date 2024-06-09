import { useFormContext } from 'react-hook-form';
import { CreateTestFormType } from '../schemas/createTestFormValidationSchemas';

const useCreateTestForm = () => useFormContext<CreateTestFormType>();

export default useCreateTestForm;
