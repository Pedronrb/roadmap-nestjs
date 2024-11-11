import {
    minLength,
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
  } from 'class-validator';
  import { ExceptionMessage } from '../data/exceptions-message';
  
  export function MinLengthCustom(
    min: number,
    validationOptions?: ValidationOptions,
  ) {
    return function (object: NonNullable<unknown>, propertyName: string) {
      registerDecorator({
        name: 'MinLengthCustom',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [min],
        options: validationOptions,
        validator: {
          validate(value: unknown) {
            return minLength(value, min);
          },
          defaultMessage(validationArguments: ValidationArguments) {
            return ExceptionMessage.MinLength(min, validationArguments.property);
          },
        },
      });
    };
  }