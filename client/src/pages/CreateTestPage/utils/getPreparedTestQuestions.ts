import { CreateTestForm } from '../../../schemas/createTestFormValidationSchemas';
import { CreateQuestionsResponse } from '../../../services/Api/types/create-questions';

const getPreparedTestQuestions = (
  createdQuestions: CreateQuestionsResponse['questions'],
  testData: CreateTestForm,
) => {
  return createdQuestions.map(({ id }, i) => ({
    questionId: id,
    maxScore: testData.questions[i].maxScore,
    timeLimit: testData.questions[i].timeLimit,
  }));
};

export default getPreparedTestQuestions;
