import { CreateTestForm } from '../../schemas/createTestFormValidationSchemas';
import getDefaultQuestion from './utils/getDefaultQuestion';

const defaultValues: CreateTestForm = {
  testImageLink: null,
  testName: '',
  testDescription: '',
  subject: '',
  questions: [getDefaultQuestion()],
};

export default defaultValues;
