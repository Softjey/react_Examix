import { Result, TestQuestionWithResults } from '../types/api/entities/testQuestion';
import QuestionType from '../types/api/enums/Type';

export default function getScore(
  question: TestQuestionWithResults,
  studentAnswer: Result['studentAnswer'],
) {
  switch (question.question.type) {
    case QuestionType.SINGLE_CHOICE: {
      if (!studentAnswer?.answers) {
        return 0;
      }
      const { maxScore } = question;
      const correctAnswer = question.question.answers.find((answer) => answer.isCorrect);

      return correctAnswer?.title === studentAnswer.answers[0]?.title ? maxScore : 0;
    }
    case QuestionType.MULTIPLE_CHOICE: {
      if (!studentAnswer?.answers) {
        return 0;
      }

      const { maxScore } = question;
      const correctAnswers = question.question.answers.filter((answer) => answer.isCorrect);
      const answerWeight = maxScore / correctAnswers.length;
      const studentScore = studentAnswer.answers.reduce((sum, pupilAnswer) => {
        const correctAnswer = correctAnswers.find((answer) => answer.title === pupilAnswer.title);

        return sum + (correctAnswer ? answerWeight : 0);
      }, 0);

      return studentScore;
    }
    default: {
      throw new Error('Unsupported question type');
    }
  }
}
