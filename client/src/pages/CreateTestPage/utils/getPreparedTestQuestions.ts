import dayjs, { Dayjs } from 'dayjs';
import { CreateTestForm } from '../../../schemas/createTestFormValidationSchemas';
import { CreateQuestionsResponse } from '../../../services/Api/types/create-questions';

const formatTimeLimit = (timeLimit: Dayjs) => {
  return dayjs(timeLimit).minute() * 60 + dayjs(timeLimit).second();
};

const getPreparedTestQuestions = (
  createdQuestions: CreateQuestionsResponse['questions'],
  testData: CreateTestForm,
) => {
  return createdQuestions.map(({ id }, i) => ({
    questionId: id,
    maxScore: testData.questions[i].maxScore,
    timeLimit: formatTimeLimit(testData.questions[i].timeLimit),
  }));
};

export default getPreparedTestQuestions;
