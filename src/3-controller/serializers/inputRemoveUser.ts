import { IsNotEmpty, IsUUID } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputRemoveUser extends Validatable<InputRemoveUser> {
  @IsNotEmpty()
  @IsUUID()
  userId!: string
}

export type OutputRemoveUser = Either<IError, boolean>
