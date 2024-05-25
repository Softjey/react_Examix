export const DETAILED_TEST_SELECT = {
  id: true,
  name: true,
  image: true,
  description: true,
  subject: true,
  authorId: true,
  createdAt: true,
  author: { select: { name: true, photo: true, createdAt: true } },
  testQuestions: {
    select: {
      id: true,
      question: {
        select: { id: true, type: true, subject: true, title: true, answers: true },
      },
      timeLimit: true,
      maxScore: true,
    },
  },
};
