import { IsNotEmpty, IsUUID } from 'class-validator'

import { IUserEntity } from '../../1-domain/entities/userEntity'
import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputViewUser extends Validatable<InputViewUser> {
  @IsNotEmpty()
  @IsUUID()
  user_id!: string
}

export type OutputViewUser = Either<IError, IUserEntity>
