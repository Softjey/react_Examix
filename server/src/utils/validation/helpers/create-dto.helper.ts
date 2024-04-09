type DtoOptions<T = Record<string, unknown>> = Record<keyof T, PropertyDecorator[]>;

function applyDecorators<T extends DtoOptions>(target: unknown, propertyDecorators: T) {
  Object.entries(propertyDecorators).forEach(([propertyKey, decorators]) => {
    decorators.forEach((decorator) => {
      decorator(target, propertyKey);
    });
  });
}

export function createDto<DtoI>(dtoOptions: DtoOptions<DtoI>) {
  const NewDto = class {} as new () => DtoI;

  applyDecorators(NewDto.prototype, dtoOptions);

  return (extraDecorators?: DtoOptions<DtoI>) => {
    if (extraDecorators) {
      applyDecorators(NewDto.prototype, extraDecorators);
    }

    return NewDto;
  };
}
