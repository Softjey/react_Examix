import { Result } from '../types/api/entities/Result';
import { TestQuestionWithResults } from '../types/api/entities/testQuestion';
import QuestionType from '../types/api/enums/Type';

export default function getScore(
  testQuestion: TestQuestionWithResults,
  studentAnswer: Result['studentAnswer'],
) {
  if (!studentAnswer?.answers) {
    return 0;
  }

  const { maxScore, question } = testQuestion;
  const { answers } = studentAnswer;

  switch (question.type) {
    case QuestionType.SINGLE_CHOICE: {
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);

      return correctAnswer?.title === answers[0]?.title ? maxScore : 0;
    }
    case QuestionType.MULTIPLE_CHOICE: {
      const correctAnswers = question.answers.filter((answer) => answer.isCorrect);
      const answerWeight = maxScore / correctAnswers.length;
      let haveIncorrectAnswer = false;
      const studentScore = studentAnswer.answers.reduce((sum, pupilAnswer) => {
        const correctAnswer = correctAnswers.find((answer) => answer.title === pupilAnswer.title);

        if (!correctAnswer || haveIncorrectAnswer) {
          haveIncorrectAnswer = true;

          return 0;
        }

        return sum + (correctAnswer ? answerWeight : 0);
      }, 0);

      return studentScore;
    }
    default: {
      throw new Error('Unsupported question type');
    }
  }
}
