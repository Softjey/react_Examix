import { CreateTestFormType } from '../../schemas/createTestFormValidationSchemas';
import getDefaultQuestion from './utils/getDefaultQuestion';

const defaultValues: CreateTestFormType = {
  testImageLink: null,
  testName: '',
  testDescription: '',
  subject: '',
  questions: [getDefaultQuestion()],
};

export default defaultValues;
