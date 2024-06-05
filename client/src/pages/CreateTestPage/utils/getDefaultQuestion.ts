import QuestionType from '../../../types/api/enums/Type';

const getDefaultQuestion = () => ({
  title: '',
  type: QuestionType.SINGLE_CHOICE as const,
  answers: [
    { title: '', isCorrect: true },
    { title: '', isCorrect: false },
    { title: '', isCorrect: false },
  ],
  maxScore: 0,
  timeLimit: 1,
});

export default getDefaultQuestion;