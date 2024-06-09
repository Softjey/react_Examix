enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export type AvailableQuestionType = QuestionType.MULTIPLE_CHOICE | QuestionType.SINGLE_CHOICE;

export default QuestionType;
