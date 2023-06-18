import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputResetPassword extends Validatable<InputResetPassword> {
  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @MinLength(6)
  @MaxLength(6)
  confirmToken!: string
}

export type OutputResetPassword = Either<IError, boolean>
