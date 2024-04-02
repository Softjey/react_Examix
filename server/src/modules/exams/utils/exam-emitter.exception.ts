import { Student } from '../entities/student.entity';

export type ExceptionType =
  | 'wrong-question-index'
  | 'exam-already-ended'
  | 'exam-already-started'
  | 'exam-not-started';

export type ExceptionDetails = WrongQuestionIndexExceptionDetails;
export interface WrongQuestionIndexExceptionDetails {
  studentId: Student['id'];
  questionIndex: number;
  currentQuestionIndex: number;
}

export class ExamEmitterException extends Error {
  type: ExceptionType;
  details?: ExceptionDetails;

  constructor(exceptionType: ExceptionType, details?: ExceptionDetails) {
    switch (exceptionType) {
      case 'wrong-question-index':
        super(`Wrong question index:`);
        break;
      case 'exam-already-ended':
        super('Exam has already ended');
        break;
      case 'exam-not-started':
        super('Exam has not started yet');
        break;
      case 'exam-already-started':
        super('Exam has already started');
        break;
      default:
        super('Unknown exception');
    }

    this.details = details;
  }
}
