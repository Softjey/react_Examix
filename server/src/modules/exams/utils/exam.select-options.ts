import { DETAILED_TEST_SELECT } from 'src/modules/tests/utils/detailed-test-select';

export const DETAILED_EXAM_SELECT = {
  id: true,
  authorId: true,
  createdAt: true,
  test: {
    select: DETAILED_TEST_SELECT,
  },
  results: { select: { testQuestionId: true, studentName: true, studentAnswer: true } },
};
