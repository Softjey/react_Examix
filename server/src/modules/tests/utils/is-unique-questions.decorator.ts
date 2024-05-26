import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';
import { CreateTestQuestionDto } from '../dtos/create-test-question.dto';

@ValidatorConstraint()
class IsUniqueQuestionConstraint implements ValidatorConstraintInterface {
  validate(questions: CreateTestQuestionDto[]) {
    const ids = questions.map((question) => question.questionId);
    const uniqueIds = new Set(ids);
    return uniqueIds.size === ids.length;
  }

  defaultMessage() {
    return 'Question ids must be unique.';
  }
}

export default function IsUniqueQuestions(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueQuestionConstraint,
    });
  };
}
