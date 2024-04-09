export const DETAILED_EXAM_SELECT = {
  id: true,
  authorId: true,
  createdAt: true,
  test: {
    select: {
      id: true,
      name: true,
      description: true,
      subject: true,
      testQuestions: {
        select: {
          id: true,
          question: { select: { type: true, subject: true, title: true, answers: true } },
          timeLimit: true,
          maxScore: true,
        },
      },
    },
  },
  results: { select: { testQuestionId: true, studentName: true, studentAnswer: true } },
};
