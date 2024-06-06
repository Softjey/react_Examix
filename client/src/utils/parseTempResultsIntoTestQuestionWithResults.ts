import { DetailedTest } from '../types/api/entities/detailedTest';
import { TempResults } from '../store/ExamStore/types/StoresExam';
import { StudentAnswer } from '../types/api/entities/question';
import { TestQuestionWithResults } from '../types/api/entities/testQuestion';

export default function parseTempResultsIntoTestQuestionWithResults(
  test: DetailedTest,
  tempResults: TempResults,
): TestQuestionWithResults[] {
  const { questions, students } = tempResults;
  const passedQuestions = questions.length;
  const questionsToParse = test.testQuestions.slice(0, passedQuestions);

  const parsedQuestions = questionsToParse.map((testQuestion) => {
    const { id, maxScore, question, timeLimit } = testQuestion;
    const results = students.map((student) => {
      const answers: StudentAnswer[] =
        student.results[testQuestion.id]?.answers.map((answer) => ({
          title: answer.title,
        })) || [];

      return {
        studentId: student.studentId,
        studentName: student.name,
        studentAnswer: { answers },
      };
    });

    return {
      id,
      timeLimit,
      maxScore,
      question: {
        id: question.id,
        title: question.title,
        type: question.type,
        answers: question.answers,
        createdAt: question.createdAt,
        authorId: question.authorId,
        subject: question.subject,
      },
      results,
    };
  });

  return parsedQuestions;
}
