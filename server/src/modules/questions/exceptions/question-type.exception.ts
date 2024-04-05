import { BadRequestException } from '@nestjs/common';
import { $Enums } from '@prisma/client';

export class QuestionTypeException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }

  static singleChoice() {
    return new QuestionTypeException(
      'Single choice question must have at least two answers, and only one is correct',
    );
  }

  static multipleChoice() {
    return new QuestionTypeException(
      'Multiple choice question must have at least two answers, and at least one is correct',
    );
  }

  static trueFalse() {
    return new QuestionTypeException(
      'True/false question must have only one correct answer and only two answers',
    );
  }

  static shortAnswer() {
    return new QuestionTypeException(
      'Short answer question must have at least one correct answer and without any other answers',
    );
  }

  static willBeImplemented(type: $Enums.Type) {
    return new QuestionTypeException(`${type} question type will be implemented soon`);
  }
}
