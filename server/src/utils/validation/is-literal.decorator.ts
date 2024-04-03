import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsLiteral(value: any, validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isLiteral',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [value],
      options: validationOptions || { message: `Property ${propertyName} must be ${value}` },
      validator: {
        validate(fieldValue: any, args: ValidationArguments) {
          return fieldValue === args.constraints[0];
        },
      },
    });
  };
}
