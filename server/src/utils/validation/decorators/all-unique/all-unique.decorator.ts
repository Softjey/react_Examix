import { ValidatorConstraint } from 'class-validator';
import { registerDecorator, ValidatorConstraintInterface } from 'class-validator';
import { AllUniqueOptions, AllUniqueValidationArguments } from './all-unique.types';

@ValidatorConstraint()
class AllUniqueConstraint implements ValidatorConstraintInterface {
  validate(items: unknown[], { constraints }: AllUniqueValidationArguments) {
    const [mapFn] = constraints;
    const mappedItems = mapFn ? items.map(mapFn) : items;
    const uniqueItems = new Set(mappedItems);

    return uniqueItems.size === mappedItems.length;
  }

  defaultMessage({ constraints }: AllUniqueValidationArguments) {
    const [, itemsName] = constraints;

    return `${itemsName ?? 'Items'} must be unique.`;
  }
}

export default function AllUnique<Items extends unknown[], ReturnItem>({
  mapFn,
  itemsName,
  ...restOptions
}: AllUniqueOptions<Items[number], ReturnItem> = {}) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'allUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: restOptions,
      constraints: [mapFn, itemsName] as AllUniqueValidationArguments['constraints'],
      validator: AllUniqueConstraint,
    });
  };
}
