import dayjs from 'dayjs';
import QuestionType from '../../../types/api/enums/Type';
import { FormQuestion } from '../../../components/CreateTestForm/schemas/createTestFormValidationSchemas';

const getDefaultQuestion = (): FormQuestion => ({
  isFromServer: false,
  title: '',
  type: QuestionType.SINGLE_CHOICE as const,
  answers: [
    { title: '', isCorrect: true },
    { title: '', isCorrect: false },
    { title: '', isCorrect: false },
  ],
  maxScore: 0,
  timeLimit: dayjs().startOf('day'),
});

export default getDefaultQuestion;
