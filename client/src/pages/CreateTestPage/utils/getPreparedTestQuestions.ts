/* eslint-disable no-console */
import dayjs, { Dayjs } from 'dayjs';
import {
  CreateTestForm,
  QuestionFromServer,
} from '../../../schemas/createTestFormValidationSchemas';
import { CreateQuestionsResponse } from '../../../services/Api/types/create-questions';
import { CreateTestQuestion } from '../../../services/Api/types/create-test';

const formatTimeLimit = (timeLimit: Dayjs) => {
  return dayjs(timeLimit).minute() * 60 + dayjs(timeLimit).second();
};

const getPreparedTestQuestions = (
  createdQuestions: CreateQuestionsResponse['questions'],
  questionsFromServer: QuestionFromServer[],
  testFormQuestions: CreateTestForm['questions'],
) => {
  console.log('test', questionsFromServer);

  const preparedTestQuestions: CreateTestQuestion[] = [];

  // make this algorithm more prettier
  let questionIndex = 0;
  let serverQuestionIndex = 0;

  testFormQuestions.forEach((question) => {
    const source = question.isFromServer
      ? questionsFromServer[serverQuestionIndex++]
      : createdQuestions[questionIndex++];

    const preparedTestQuestion: CreateTestQuestion = {
      questionId: source.id,
      maxScore: question.maxScore,
      timeLimit: formatTimeLimit(question.timeLimit),
    };

    preparedTestQuestions.push(preparedTestQuestion);
  });

  return preparedTestQuestions;
};

export default getPreparedTestQuestions;
