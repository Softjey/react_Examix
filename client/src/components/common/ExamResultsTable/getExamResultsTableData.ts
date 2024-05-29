import { Answer } from '../../../types/api/entities/question';
import { TestQuestionWithResults } from '../../../types/api/entities/testQuestion';
import { Nullable } from '../../../types/utils/Nullable';
import getScore from '../../../utils/getScore';

type TestResultInfo = {
  answers: Nullable<Pick<Answer, 'title'>[]>[];
  scores: number[];
  scoreSum: number;
  percentage: number;
};

export default function getExamResultsTableData(questions: TestQuestionWithResults[]) {
  const resultsMap = new Map<string, TestResultInfo>();
  const testMaxScore = questions.reduce((sum, { maxScore }) => sum + maxScore, 0);

  questions.forEach((question) => {
    question.results.forEach(({ studentAnswer, studentName }) => {
      const results = resultsMap.get(studentName);
      const score = getScore(question, studentAnswer);
      const answers = studentAnswer?.answers || null;

      if (results) {
        resultsMap.set(studentName, {
          answers: [...results.answers, answers],
          scores: [...results.scores, score],
          scoreSum: results.scoreSum + score,
          percentage: (results.scoreSum + score) / question.maxScore,
        });
      } else {
        resultsMap.set(studentName, {
          answers: [answers],
          scores: [score],
          scoreSum: score,
          percentage: score / question.maxScore,
        });
      }
    });
  });

  return {
    resultsMap,
    results: [...resultsMap.entries()],
    testMaxScore,
  };
}
