import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputRemoveUser extends Validatable<InputRemoveUser> {
  @IsNotEmpty()
  @IsUUID()
  user_id!: string

  @IsOptional()
  @IsUUID()
  user_context_id?: string
}

export type OutputRemoveUser = Either<IError, boolean>
