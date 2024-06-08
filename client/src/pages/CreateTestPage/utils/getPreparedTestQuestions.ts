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
  testData: CreateTestForm,
) => {
  console.log('test', questionsFromServer);

  const res: CreateTestQuestion[] = [];

  // make this algorithm more prettier
  let questionIndex = 0;
  let serverQuestionIndex = 0;

  testData.questions.forEach((question) => {
    const obj: CreateTestQuestion = question.isFromServer
      ? {
          questionId: questionsFromServer[serverQuestionIndex].id,
          maxScore: question.maxScore,
          timeLimit: formatTimeLimit(question.timeLimit),
        }
      : {
          questionId: createdQuestions[questionIndex].id,
          maxScore: question.maxScore,
          timeLimit: formatTimeLimit(question.timeLimit),
        };

    res.push(obj);

    if (question.isFromServer) {
      serverQuestionIndex++;
    } else {
      questionIndex++;
    }
  });

  return res;
};

export default getPreparedTestQuestions;
