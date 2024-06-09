import { useFormContext } from 'react-hook-form';
import { CreateTestForm } from '../schemas/createTestFormValidationSchemas';

const useCreateTestForm = () => useFormContext<CreateTestForm>();

export default useCreateTestForm;
