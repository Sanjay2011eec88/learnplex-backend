import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

import { Topic } from '../../../entity/Topic.entity'

@ValidatorConstraint({ async: true })
export class ValidTopicIdConstraint implements ValidatorConstraintInterface {
  validate(id: string): Promise<boolean> {
    return Topic.find({ where: { id }, take: 1 }).then(([topic]: Topic[]) => {
      return !!topic
    })
  }
}

export function ValidTopicId(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidTopicIdConstraint,
    })
  }
}
