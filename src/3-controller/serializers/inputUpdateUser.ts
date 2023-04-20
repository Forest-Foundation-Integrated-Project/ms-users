import { IsNotEmpty, IsString, IsDate, Matches } from 'class-validator'

import { IUserEntity } from '../../1-domain/entities/userEntity'
import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputUpdateUser extends Validatable<InputUpdateUser> {
  @IsNotEmpty()
  @IsString()
  userId!: string

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsDate()
  birthDate!: Date

  @IsNotEmpty()
  @IsString()
  username!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}

export type OutputUpdateUser = Either<IError, IUserEntity>
