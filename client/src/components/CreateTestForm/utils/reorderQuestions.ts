import { CreateTestFormType } from '../schemas/createTestFormValidationSchemas';

export default function reorderQuestions(
  questions: CreateTestFormType['questions'],
  indexToMove: number,
  targetIndex: number,
) {
  const itemToMove = questions[indexToMove];
  const questionsWithoutItemToMove = questions.filter((_, index) => index !== indexToMove);

  return [
    ...questionsWithoutItemToMove.slice(0, targetIndex),
    itemToMove,
    ...questionsWithoutItemToMove.slice(targetIndex),
  ];
}
