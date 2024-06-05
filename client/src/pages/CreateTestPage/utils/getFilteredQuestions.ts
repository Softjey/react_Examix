import { CreateTestForm } from '../../../schemas/createTestFormValidationSchemas';
import Subject from '../../../types/api/enums/Subject';

const getFilteredQuestions = (testData: CreateTestForm) => {
  return testData.questions.map((question) => {
    const { maxScore, timeLimit, ...rest } = question;
    if (testData.subject) {
      return { ...rest, subject: testData.subject as Subject };
    }
    return rest;
  });
};

export default getFilteredQuestions;
