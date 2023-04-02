import { IsNotEmpty, IsString, IsDate, Matches } from 'class-validator'

import { IUserEntity } from '../../domain/entities/userEntity'
import { Either } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputCreateUser extends Validatable<InputCreateUser> {
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

  @IsNotEmpty()
  @IsString()
  enroll!: string
}

export type OutputCreateUser = Either<IError, IUserEntity>
