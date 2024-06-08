import { CreateTestForm } from '../../../schemas/createTestFormValidationSchemas';
import Subject from '../../../types/api/enums/Subject';

const getFilteredQuestions = (testData: CreateTestForm) => {
  return testData.questions
    .filter((question) => !question.isFromServer)
    .map((question) => {
      const { answers, title, type } = question;
      if (testData.subject) {
        return { answers, title, type, subject: testData.subject as Subject };
      }
      return { answers, title, type };
    });
};

export default getFilteredQuestions;
