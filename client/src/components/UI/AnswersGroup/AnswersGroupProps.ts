import { StudentAnswer } from '../../../types/api/entities/question';

export default interface AnswersGroupProps {
  answers: StudentAnswer[];
  disabled?: boolean;
  onAnswer: (answers: StudentAnswer[]) => void;
}
