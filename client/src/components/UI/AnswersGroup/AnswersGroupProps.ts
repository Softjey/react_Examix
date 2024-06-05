import { StudentAnswer } from '../../../types/api/entities/question';

export default interface AnswersGroupProps {
  answers: StudentAnswer[];
  onAnswer: (answers: StudentAnswer[]) => void;
}
